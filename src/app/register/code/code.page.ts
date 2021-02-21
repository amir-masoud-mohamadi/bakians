import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import {loginRegister} from "../../shared/service/login-register";
import {DataModel} from "./data-model";
import {HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {
  phoneNumber;
  form: FormGroup;
  errorMsg;
  constructor(
    private loading: LoadingController,
    private userService: loginRegister,
    private router: Router,
    private alertCtrl: AlertController,
    ) { }

  ngOnInit() {
    if(localStorage.getItem('phoneNumber') !== undefined && localStorage.getItem('phoneNumber') !== null) {
    this.phoneNumber = localStorage.getItem('phoneNumber');
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.maxLength(4)]),

    });
    } else {
      this.router.navigate(['/', 'register']);
    }
  }
  addRecipe(){
    if (this.form.value.code === undefined || this.form.value.code === null) {
      this.alertCtrl.create({
        message: 'لطفا کد را وارد کنید', buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    } else {
      this.loading.create({message: 'ذخیره سازی ...', keyboardClose: true}).then(load => {
        load.present();
        if (parseInt(this.form.value.code)){
          this.userService.validCode(this.form.value.code).subscribe((com: HttpResponse<DataModel>) => {
            if (com.status === 200) {
              if(com.body.success == '1') {
                console.log(com.body);
                this.loading.dismiss();
                this.router.navigate(['/', 'register', 'confirm']);
              } else if(com.body.success == '0') {
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: 'کد تایید اشتباه است', buttons: [
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
              message: 'کد تایید اشتباه است', buttons: [
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

            message: 'کد تایید اشتباه است', buttons: [
              {
                text: 'تایید',
                role: 'cancel'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });

        }

      });

    }





  }

}
