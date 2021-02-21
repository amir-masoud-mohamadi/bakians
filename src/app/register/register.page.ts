import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import {loginRegister} from "../shared/service/login-register";
import {DataModel} from "./code/data-model";
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  errorMsg;
  constructor(private router: Router,
              private alertCtrl: AlertController,
              private userService: loginRegister,
              private loading: LoadingController
              ) { }

  ngOnInit() {
    this.form = new FormGroup({
      phoneNumber: new FormControl(null, [Validators.required, Validators.maxLength(4)])
    });
  }
  addRecipe(){

    if (this.form.value.phoneNumber !== undefined && this.form.value.phoneNumber !== null) {
      console.log(this.form.value.phoneNumber.toString().length);
      let phone = this.form.value.phoneNumber.toString();
      console.log(phone);
      console.log(phone.length);
      this.loading.create({message: 'ذخیره سازی ...', keyboardClose: true}).then(load => {
        load.present();

        if (phone.length === 11){
          phone = phone.replace('0', '');
          console.log('10');
          this.userService.reciveCode(this.form.value.phoneNumber).subscribe((com: HttpResponse<DataModel>) => {
            if (com.status === 200) {
              if (com.body.success === '1'){
                console.log(com.body);
                localStorage.setItem('phoneNumber', this.form.value.phoneNumber);
                this.loading.dismiss();
                this.router.navigate(['/', 'register', 'code']);
              }
              if(com.body.success == '-1') {
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: 'شماره موبایل ثبت شده است', buttons: [
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
            console.log('com');
            console.log(com);

          }, err => {
            this.errorMsg = 'خطا در ورود به سامانه:' + err.status;
            this.loading.dismiss();
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

        } else {
          this.loading.dismiss();
          this.alertCtrl.create({
            message: 'شماره تلفن معتبر نیست' , buttons: [
              {
                text: 'تایید',
                role: 'cancel'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });
          return;
        }
      });
    } else {
      this.alertCtrl.create({
        message: 'لطفا شماره همراه خود را وارد کنید', buttons: [
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
