import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: [ './zoom-range.component.scss'
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef
  zoomRangerMap!: mapboxgl.Map;
  zoomLevel: number = 10;
  lngLat: [number, number] = [ -98.26989694777838, 19.050234835083913 ];

  constructor() { }

  ngOnDestroy(): void {
    this.zoomRangerMap.off('zoom', () => {})
    this.zoomRangerMap.off('zoomend', () => {})
    this.zoomRangerMap.off('move', () => {})
  }

  ngAfterViewInit(): void {

      this.zoomRangerMap = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: this.zoomLevel
    });

    this.zoomRangerMap.on('zoom', (e) => {
      this.zoomLevel = this.zoomRangerMap.getZoom()
    })

    this.zoomRangerMap.on('zoomend', (e) => {
      if( this.zoomRangerMap.getZoom() > 19 ) {
        this.zoomRangerMap.zoomTo( 19 );
      }
    })

    this.zoomRangerMap.on('move', (e) => {
      const target = e.target;
      const { lng, lat } = target.getCenter();
      this.lngLat = [ lng,lat ];
    })


  }

  zoomOut() {
    this.zoomRangerMap.zoomOut();
  }

  zoomIn() {
    this.zoomRangerMap.zoomIn();
  }

  zoomChange( value: string ) {
    this.zoomRangerMap.zoomTo( Number(value) );
  }

}
