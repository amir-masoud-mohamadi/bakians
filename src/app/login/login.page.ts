import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {loginRegister} from "../shared/service/login-register";
import {HttpResponse} from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataModel2} from "../register/data-model2";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  errorMsg;
  constructor(
    private alertCtrl: AlertController,
    private userService: loginRegister,
    private loading: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required]),

    });
  }
  addRecipe(){
    console.log(this.form.value);

    /*this.userService.login(this.form.value).subscribe(com => {
      console.log(com);
    });*/
    this.loading.create({message: 'لطفا صبر کنید ...', keyboardClose: true}).then(load => {
      load.present();

      if (this.form.value.phone !== null && this.form.value.phone !== undefined) {
        if (this.form.value.phone.toString().length === 11){
          let phone = this.form.value.phone.toString();
          phone = phone.replace('0', '');
          console.log('10');
          const url = {
            phone,
          };
          this.userService.reciveCode(url).subscribe((com: HttpResponse<DataModel2>) => {
            if (com.status === 200) {
              if (com.body.success === '1'){
                console.log(com.body);
                localStorage.setItem('phoneNumber', phone);
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: 'کد تایید ارسال شد' , buttons: [
                    {
                      text: 'تایید',
                      handler: () => {
                  this.router.navigate(['/', 'register', 'code']);
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

      } else {
        this.loading.dismiss();
        this.alertCtrl.create({
          message: 'شماره تلفن را وارد کنید' , buttons: [
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
