import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() { }

  async ngOnInit() {
    /*if  (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('incorrect');
    } else {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
    }*/
  }

}
