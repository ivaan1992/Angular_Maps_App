import { Component, OnInit } from '@angular/core';

interface MenuSection {
  name: string;
  route: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  `
    li {
      cursor: pointer;
    }
  `
  ]
})

export class MenuComponent {

  menuItem: MenuSection[] = [

    {
      name: 'FullScreen',
      route: '/maps/fullscreen'
    },
    {
      name: 'Zoom Range',
      route: '/maps/zoom-range'
    },
    {
      name: 'Markers',
      route: '/maps/markers'
    },
    {
      name: 'Estates',
      route: '/maps/estates'
    },

  ]

}
