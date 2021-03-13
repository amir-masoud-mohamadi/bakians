import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-location-permision',
  templateUrl: './location-permision.page.html',
  styleUrls: ['./location-permision.page.scss'],
})
export class LocationPermisionPage implements OnInit {

  constructor(private router: Router) { }

   ngOnInit() {

  }
  async clickGps() {

      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
      console.log(coordinates.coords.latitude.toString());
      console.log(coordinates.coords.longitude.toString());
      localStorage.setItem('latitude', coordinates.coords.latitude.toString());
      localStorage.setItem('lan', coordinates.coords.longitude.toString());
    
    this.router.navigate(['/', 'home']);
  }
}
