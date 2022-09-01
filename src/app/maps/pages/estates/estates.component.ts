import { Component } from '@angular/core';

interface Estate {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styles: [
  ]
})
export class EstatesComponent {

  estates: Estate[] = [
    {
      title: 'Residential house, Canada',
      description: 'Beautiful estate in Katana, Canada.',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Beach house, Mexico',
      description: 'Beautiful beach house in Acapulco, Mexico.',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartment, Argentina',
      description: 'Luxury apartment in the heartof the city  Buenos Aires, Argentina.',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Commercial premises, Spain',
      description: 'Commercial space available in Madrid, Spain, near El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
  ]

}
