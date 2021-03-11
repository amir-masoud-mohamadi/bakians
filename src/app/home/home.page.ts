import { Component, OnInit } from '@angular/core';
import {ProductComponent} from './product/product.component';
import {AlertController, ModalController} from '@ionic/angular';
import {DataModel2} from '../register/data-model2';
import {HttpResponse} from '@angular/common/http';
import {Map} from '../shared/service/map';
import {SearchComponent} from './search/search.component';
import {loginRegister} from '../shared/service/login-register';
import {Capacitor, Plugins} from '@capacitor/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'mapir-angular-test';
  location;
  errorMsg;
  input;
  listBaterry;
  center: Array<number> = [51.338064963919834, 35.70017923069952];
  markerPosition: Array<number> = [51.338064963919834, 35.70017923069952];
  apiKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE5MDQyZGM5MGVhNmFjN2U3OWU2YWU5NjJkZDViZjQ5ZmEzZjQzZDViYzQ3MThiOTk4MzdiM2QwNjBmZjgyYzg1ZDE1ODViZjE4OGJiMDhiIn0.eyJhdWQiOiIxMjExMCIsImp0aSI6IjE5MDQyZGM5MGVhNmFjN2U3OWU2YWU5NjJkZDViZjQ5ZmEzZjQzZDViYzQ3MThiOTk4MzdiM2QwNjBmZjgyYzg1ZDE1ODViZjE4OGJiMDhiIiwiaWF0IjoxNjE0MTY4NTQ3LCJuYmYiOjE2MTQxNjg1NDcsImV4cCI6MTYxNDUxNDE0Nywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.qsSghHPPKPpcvbg-ynJ6NFgtUGJJCaaYH_UuqjxxjPUrlqmDTLNL0Z1M9phEZTwxbtL1dDQcdmjnm7RKLjUSon8LxHMYIkP9kk7Zpehh1suR_vTtjrIAkIrH1gjdmxug64knegNkmzS5uUWd4LVVbdyHuyeA9iOwjc2QoskqcTDUYk_R4qWFn7QRbTF91kbALOVBhZAgtJo1VBIj1lnBvynwMAed3KbmjuqbSV4Bdfpsoid6dEygwX1Z1CDDNe_LoCIQIWunuXnffP5Kt0R8lOrb7Lb_S9M5n2DLPc-InkyNGRxg2bcY0epZqdymKpkAvHw-BzqUhhV2VZ4oYcsMQQ';
  constructor(private modalController: ModalController, private userService: loginRegister, private map: Map, private alertCtrl: AlertController) { }

    ngOnInit() {

    if (localStorage.getItem('lat')) {
      localStorage.removeItem('lng');
      localStorage.removeItem('lat');
      localStorage.removeItem('address');

    }
    if (localStorage.getItem('latitude')) {
      this.markerPosition = [+localStorage.getItem('lan'), +localStorage.getItem('latitude')];
      this.center = [+localStorage.getItem('lan'), +localStorage.getItem('latitude')];
    }
    /*if  (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('incorrect');
    } else {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
    }*/
  }
  async clickGps() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('incorrect');
    } else {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
      this.markerPosition = [coordinates.coords.longitude, coordinates.coords.latitude];
      this.center = [coordinates.coords.longitude, coordinates.coords.latitude];
    }
  }
  /*async presentModal() {
    const modal = await this.modalController.create({
      component: ProductComponent,
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }*/
  clicked(e: any) {
    console.log(e);
    if ('lngLat' in e) {
      this.markerPosition = [e.lngLat.lng, e.lngLat.lat];
      this.center = [e.lngLat.lng, e.lngLat.lat];
      const address = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
        api: this.apiKey
      };
      this.map.address(address).subscribe((com: any) => {
        if (com.status === 200) {
          console.log(com.body);
          console.log(com.body.address_compact);
          this.input = com.body.address_compact;
        }


      }, err => {
        this.errorMsg = 'خطا در ورود به سامانه:' + err.status;
        this.alertCtrl.create({
          message: this.errorMsg, buttons: [
            {
              text: 'تایید',
              role: 'cancel'
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      });
    }
  }

  dragged(e: any) {
    console.log(e._lngLat);
    this.markerPosition = [e._lngLat.lng, e._lngLat.lat];
    this.center = [e._lngLat.lng, e._lngLat.lat];
    const address = {
      lat: e._lngLat.lat,
      lng: e._lngLat.lng,
      api: this.apiKey
    };
    this.map.address(address).subscribe((com: any) => {
      if (com.status === 200) {
        console.log(com.body);
        console.log(com.body.address_compact);
        this.input = com.body.address_compact;
      }


    }, err => {
      this.errorMsg = 'خطا در ورود به سامانه:' + err.status;
      this.alertCtrl.create({
        message: this.errorMsg, buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    });
  }
  async clickButton() {

    const modal2 = await this.modalController.create({
      component: ProductComponent,
      cssClass: 'custom-modal',
    });
    return await modal2.present();
  }
  async modalSearch(){
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'custom-modal2'
    });
    modal.onDidDismiss().then((data) => {
      if (localStorage.getItem('address')) {
        console.log('data');
        console.log('asdasdasdsadsa');
        const lat = +localStorage.getItem('lat');
        const lng = +localStorage.getItem('lng');
        console.log(lat);
        console.log(lng);
        console.log(localStorage.getItem('address'));
        this.input = localStorage.getItem('address');
        this.markerPosition = [lat, lng];
        this.center = [lat, lng];
        localStorage.removeItem('lng');
        localStorage.removeItem('lat');
        localStorage.removeItem('address');
      }
    });
    return await modal.present();
  }
  ionModalWillDismiss() {

  }
}
