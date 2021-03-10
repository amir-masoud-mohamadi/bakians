import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import {loginRegister} from '../../shared/service/login-register';

import {HttpResponse} from '@angular/common/http';
import {DataModel2} from '../data-model2';
@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {
  phoneNumber;
  id;
  flag = false;
  form: FormGroup;
  errorMsg;
  constructor(
    private loading: LoadingController,
    private userService: loginRegister,
    private router: Router,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
    ) { }

   ngOnInit() {
     this.route.params.subscribe((params: Params) => {
      if (params.forget) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    });
    if (localStorage.getItem('phoneNumber') !== undefined && localStorage.getItem('phoneNumber') !== null) {
    this.phoneNumber = localStorage.getItem('phoneNumber');
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.maxLength(4)]),

    });
    } else {
      this.router.navigate(['/', 'login']);
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
          const phone = {
            code: this.form.value.code,
            phone: localStorage.getItem('phoneNumber')
          };
          this.userService.login(phone).subscribe((com: HttpResponse<DataModel2>) => {
            if (com.status === 200) {
              if (com.body.success === '1'){
                console.log(com.body);
                localStorage.setItem('token', com.body.token);
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: com.body.message , buttons: [
                    {
                      text: 'تایید',
                      handler: () => {
                        this.router.navigate(['/', 'location-permision']);
                      }
                    }
                  ]
                }).then(alertEl => {
                  alertEl.present();
                });
              }
              if (com.body.success === '0') {
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: com.body.message, buttons: [
                    {
                      text: 'تایید',
                      role: 'cancel'
                    }
                  ]
                }).then(alertEl => {
                  alertEl.present();
                });
              } else if (com.body.success === '-1') {
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: com.body.message, buttons: [
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
