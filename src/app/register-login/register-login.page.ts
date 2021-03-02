import { Component, OnInit } from '@angular/core';
import {Capacitor, Geolocation, Plugins} from '@capacitor/core';
import {Router} from '@angular/router';
import {async} from 'q';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.page.html',
  styleUrls: ['./register-login.page.scss'],
})
export class RegisterLoginPage implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {
    /*if  (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('incorrect');
    } else {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
      this.router.navigate(['/', 'register-login', coordinates.coords.latitude]);
    }*/
  }

}
