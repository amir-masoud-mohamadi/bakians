import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataModel} from "../code/data-model";
import {loginRegister} from "../../shared/service/login-register";
import { LoadingController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {DataModel2} from "../data-model2";
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  form: FormGroup;
  errorMsg;
  constructor(
    private loading: LoadingController,
    private userService: loginRegister,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),

    });
  }

  ngOnInit() {
    if(localStorage.getItem('phoneNumber') !== undefined && localStorage.getItem('phoneNumber') !== null) {

    } else {
      this.router.navigate(['/', 'register']);
    }
  }
  addRecipe(){
    /*this.userService.confirm(this.form.value).subscribe(com => {
      console.log(com);
      this.router.navigate(['/', 'register-login'])
    });*/
    console.log(this.form.value.password);
    if (this.form.value.name !== undefined && this.form.value.name !== null) {
      if (this.form.value.password !== undefined && this.form.value.password !== null) {
        if (this.form.value.password.toString().length > 6) {
          this.loading.create({message: 'ذخیره سازی ...', keyboardClose: true}).then(load => {
            load.present();
              localStorage.setItem('name', this.form.value.name);
              localStorage.setItem('password', this.form.value.password);
              this.router.navigate(['/', 'register', 'town-list']);
              this.loading.dismiss();

          });
        } else {
          this.alertCtrl.create({
            message: 'حداقل 6 کاراکتر برای رمزعبور وارد کنید', buttons: [
              {
                text: 'تایید',
                role: 'cancel'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });
        }
      } else {
        this.alertCtrl.create({
          message: 'لطفا پسورد را وارد کنید', buttons: [
            {
              text: 'تایید',
              role: 'cancel'
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    } else {
      this.alertCtrl.create({
        message: 'لطفا نام را وارد کنید', buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }
}
