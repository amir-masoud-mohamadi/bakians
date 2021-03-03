import { Component, OnInit } from '@angular/core';
import {ProductComponent} from './product/product.component';
import {ModalController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private modalController: ModalController) { }

  async ngOnInit() {
    /*if  (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('incorrect');
    } else {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
    }*/
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ProductComponent,
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }
}
