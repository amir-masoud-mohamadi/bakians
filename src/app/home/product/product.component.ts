import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams} from '@ionic/angular';
import {Map} from '../../shared/service/map';
import {loginRegister} from '../../shared/service/login-register';
import {HttpResponse} from '@angular/common/http';
import {DataModel2} from '../../register/data-model2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  errorMsg;
  listBaterry;
  listSearch = [];
  flagBaterry = false;
  constructor(public modalCtrl: ModalController,
              private userService: loginRegister,
              private alertCtrl: AlertController,
              private loading: LoadingController,
              private navParams: NavParams) {


  }

  async ngOnInit() {
    console.log('this.flagBaterry');
    console.log(this.flagBaterry);

    const car = {
      car: 'پراید'
    };
    await this.userService.getBattery(car).subscribe((com: HttpResponse<any>) => {
      if (com.status === 200) {
        this.listBaterry = com.body;
        console.log(this.listBaterry);
        console.log('com');
        console.log(this.listBaterry);
        this.flagBaterry = true;
        console.log('this.flagBaterry');
        console.log(this.flagBaterry);

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
  dismiss() {
    console.log('asdasd');
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(
      {message: 'close'}, 'close');
  }
}
