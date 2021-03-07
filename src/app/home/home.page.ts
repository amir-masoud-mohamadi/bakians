import { Component, OnInit } from '@angular/core';
import {ProductComponent} from './product/product.component';
import {ModalController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'mapir-angular-test';
  center: Array<number> = [51.367918, 35.712706];
  markerPosition: Array<number> = [51.367918, 35.712706]
  apiKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE5MDQyZGM5MGVhNmFjN2U3OWU2YWU5NjJkZDViZjQ5ZmEzZjQzZDViYzQ3MThiOTk4MzdiM2QwNjBmZjgyYzg1ZDE1ODViZjE4OGJiMDhiIn0.eyJhdWQiOiIxMjExMCIsImp0aSI6IjE5MDQyZGM5MGVhNmFjN2U3OWU2YWU5NjJkZDViZjQ5ZmEzZjQzZDViYzQ3MThiOTk4MzdiM2QwNjBmZjgyYzg1ZDE1ODViZjE4OGJiMDhiIiwiaWF0IjoxNjE0MTY4NTQ3LCJuYmYiOjE2MTQxNjg1NDcsImV4cCI6MTYxNDUxNDE0Nywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.qsSghHPPKPpcvbg-ynJ6NFgtUGJJCaaYH_UuqjxxjPUrlqmDTLNL0Z1M9phEZTwxbtL1dDQcdmjnm7RKLjUSon8LxHMYIkP9kk7Zpehh1suR_vTtjrIAkIrH1gjdmxug64knegNkmzS5uUWd4LVVbdyHuyeA9iOwjc2QoskqcTDUYk_R4qWFn7QRbTF91kbALOVBhZAgtJo1VBIj1lnBvynwMAed3KbmjuqbSV4Bdfpsoid6dEygwX1Z1CDDNe_LoCIQIWunuXnffP5Kt0R8lOrb7Lb_S9M5n2DLPc-InkyNGRxg2bcY0epZqdymKpkAvHw-BzqUhhV2VZ4oYcsMQQ';
  constructor(private modalController: ModalController) { }

  async ngOnInit() {
    /*if  (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('incorrect');
    } else {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
    }*/
  }
  /*async presentModal() {
    const modal = await this.modalController.create({
      component: ProductComponent,
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }*/
  clicked(e: any) {
    if ('lngLat' in e) this.markerPosition = [e.lngLat.lng, e.lngLat.lat];
  }
  dragged(e: any) {
    console.log(e._lngLat);
  }
}
