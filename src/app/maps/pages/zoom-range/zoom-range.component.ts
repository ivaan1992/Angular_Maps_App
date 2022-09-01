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

  constructor() { }

  ngAfterViewInit(): void {

      this.zoomRangerMap = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -98.26989694777838, 19.050234835083913 ],
      zoom: 18
    });
  }

  zoomOut() {
    this.zoomRangerMap.zoomOut();
  }

  zoomIn() {
    this.zoomRangerMap.zoomIn();
  }

}
