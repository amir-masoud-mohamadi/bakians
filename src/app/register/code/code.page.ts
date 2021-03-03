import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import {loginRegister} from "../../shared/service/login-register";
import {DataModel} from "./data-model";
import {HttpResponse} from '@angular/common/http';
import jsSHA from 'jssha';
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

  async ngOnInit() {
    await this.route.params.subscribe((params: Params) => {
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
          const codeStorage = localStorage.getItem('code');
          const shaObj = new jsSHA('SHA-256', 'TEXT');
          shaObj.update(this.form.value.code);
          const hash = shaObj.getHash('HEX');
          console.log('hash');
          console.log(hash);
          console.log('this.form.value.code');
          console.log(this.form.value.code);
          if (hash === codeStorage) {
            this.loading.dismiss();
            if (this.flag) {
              this.router.navigate(['/', 'change-password']);
            } else {
              this.router.navigate(['/', 'register', 'confirm']);
            }
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
