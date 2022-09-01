import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: [ './zoom-range.component.scss'
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef
  zoomRangerMap!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { }

  ngAfterViewInit(): void {

      this.zoomRangerMap = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -98.26989694777838, 19.050234835083913 ],
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
