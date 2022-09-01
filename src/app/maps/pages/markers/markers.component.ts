import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarker {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [ number, number ];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: [ './markers.component.scss']
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef
  markersMap!: mapboxgl.Map;
  zoomLevel: number = 15;
  lngLat: [number, number] = [ -98.26989694777838, 19.050234835083913 ];


  markers: ColorMarker[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.markersMap = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: this.zoomLevel
    });

    this.readLocalStorage()

   // way 1 to add markers:

     /* new mapboxgl.Marker()
    .setLngLat( this.lngLat )
    .addTo( this.markersMap ) */

   // way 2 to add dynamic markers:

  }
  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat( this.lngLat )
    .addTo( this.markersMap )

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkersAtLocalStorage()

    newMarker.on('dragend', () => {
      this.saveMarkersAtLocalStorage();
    })
  }

  goToMarker( marker: mapboxgl.Marker ) {
    this.markersMap.flyTo({
      center: marker.getLngLat()
    })

  }

  saveMarkersAtLocalStorage() {

    const lngLatArr: ColorMarker[] = [];

    this.markers.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        center: [ lng, lat ]
      })

    });

    localStorage.setItem('markers', JSON.stringify(lngLatArr) );
  }

  readLocalStorage() {

    if( !localStorage.getItem('markers') ) {
      return;
    }

    const lngLatArr: ColorMarker[] = JSON.parse(localStorage.getItem('markers')! );

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat( m.center! )
      .addTo( this.markersMap )

      this.markers.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.saveMarkersAtLocalStorage();
      })

    })

  }

  removeMarker( i: number ) {
    this.markers[i].marker?.remove();
    this.markers.splice( i, 1 );
    this.saveMarkersAtLocalStorage();
  }

}
