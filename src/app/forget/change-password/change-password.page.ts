import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from '@ionic/angular';
import {loginRegister} from '../../shared/service/login-register';
import {Router} from '@angular/router';
import {DataModel} from '../../register/code/data-model';
import {HttpResponse} from '@angular/common/http';
import {DataModel2} from '../../register/data-model2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  form: FormGroup;
  errorMsg;
  constructor(
    private loading: LoadingController,
    private userService: loginRegister,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      password2: new FormControl(null, [Validators.required, Validators.maxLength(1)]),

    });
  }
  addRecipe(){
    console.log(this.form.value.password);
      if (this.form.value.password !== undefined && this.form.value.password !== null) {
        if (this.form.value.password.toString().length > 6) {
          if (this.form.value.password === this.form.value.password2) {
            this.loading.create({message: 'ذخیره سازی ...', keyboardClose: true}).then(load => {
              load.present();
              this.userService.passForget(this.form.value.password).subscribe((com: HttpResponse<DataModel2>) => {
                if (com.status === 200) {
                  if (com.body.success === '1'){
                    console.log(com.body);

                    this.loading.dismiss();
                    this.router.navigate(['/', 'location-permision']);
                    localStorage.setItem('token', com.body.token);
                  }
                  if (com.body.success === '-1') {
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

            });
          } else {
            this.alertCtrl.create({
              message: 'تفاوت در رمز عبور', buttons: [
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
    }

}
