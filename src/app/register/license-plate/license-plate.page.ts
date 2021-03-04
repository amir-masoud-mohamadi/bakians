import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {loginRegister} from "../../shared/service/login-register";
import {HttpResponse} from '@angular/common/http';
import {DataModel4} from "./data-model4";
import {AlertController, LoadingController} from '@ionic/angular';
import {DataModel5} from "./data-model5";
import {DataModel2} from "../data-model2";
import {Router} from '@angular/router';
import {DataModel3} from "../town-list/data-model3";
@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.page.html',
  styleUrls: ['./license-plate.page.scss'],
})
export class LicensePlatePage implements OnInit {

  form: FormGroup;
  errorMsg;
  listCompany = [{id: '0', name: 'کمپانی خودرو'}];
  listModels = [{id: '0', name: 'مدل خودرو'}];
  plak = [
    {
      id: '00',
      name: 'انتخاب کنید'
    },
    {
      id: '01',
      name: 'الف'
    },
    {
      id: '02',
      name: 'ب'
    },
    {
      id: '03',
      name: 'پ'
    },
    {
      id: '04',
      name: 'ت'
    },
    {
      id: '05',
      name: 'ث'
    },
    {
      id: '06',
      name: 'ج'
    },
    {
      id: '07',
      name: 'چ'
    },
    {
      id: '08',
      name: 'ح'
    },
    {
      id: '09',
      name: 'خ'
    },
    {
      id: '10',
      name: 'د'
    },
    {
      id: '11',
      name: 'ذ'
    },
    {
      id: '12',
      name: 'ر'
    },
    {
      id: '13',
      name: 'ز'
    },
    {
      id: '14',
      name: 'ژ'
    },
    {
      id: '15',
      name: 'س'
    },
    {
      id: '16',
      name: 'ش'
    }
    ,
    {
      id: '17',
      name: 'ص'
    },
    {
      id: '18',
      name: 'ض'
    },
    {
      id: '19',
      name: 'ط'
    },
    {
      id: '20',
      name: 'ظ'
    },
    {
      id: '21',
      name: 'ع'
    },
    {
      id: '22',
      name: 'غ'
    },
    {
      id: '23',
      name: 'ف'
    },
    {
      id: '24',
      name: 'ق'
    },
    {
      id: '25',
      name: 'ک'
    },
    {
      id: '26',
      name: 'گ'
    },
    {
      id: '27',
      name: 'ل'
    },
    {
      id: '28',
      name: 'م'
    },
    {
      id: '29',
      name: 'ن'
    },
    {
      id: '30',
      name: 'و'
    },
    {
      id: '31',
      name: 'ه'
    },
    {
      id: '32',
      name: 'ی'
    }
    ];


  constructor(private userService: loginRegister,
              private alertCtrl: AlertController,
              private loading: LoadingController,
              private router: Router,
              ) { }

  ngOnInit() {
    if (localStorage.getItem('phoneNumber') !== undefined && localStorage.getItem('phoneNumber') !== null) {
      this.form = new FormGroup({
        company: new FormControl('0', [Validators.required]),
        model: new FormControl('0', [Validators.required]),
        plate: new FormGroup(
          {
            plate1: new FormControl(null, [Validators.required]),
            plate2: new FormControl('00', [Validators.required]),
            plate3: new FormControl(null, [Validators.required]),
            plate4: new FormControl(null, [Validators.required]),
          }
        )
      });
      this.dis();
    } else {
      this.router.navigate(['/', 'register']);
    }
  }

  async dis() {

    await this.userService.company().subscribe((com: DataModel4)  => {
      console.log(com);
      if (com.success === '1'){

          for (let i = 0; i < com.car_companies.length; i++)
          this.listCompany.push(com.car_companies[i]);

        console.log('this.listCompany');
        console.log(this.listCompany);

      }else if (com.success === '-1') {
        this.alertCtrl.create({
          message: 'خطا در ورود به سامانه', buttons: [
            {
              text: 'تایید',
              role: 'cancel'
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    } , err => {
      this.errorMsg = 'خطا در ورود به سامانه:' + err.status;
      this.alertCtrl.create({
        message: 'خطا در ورود به سامانه', buttons: [
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
  onChange(e) {
    console.log(e.target.value);

    if (e.target.value !== '0') {

      console.log(1);
      const id = {
        company_id : parseInt(e.target.value)
      };
      console.log('id');
      console.log(id);
      this.listModels = [{id: '0', name: 'مدل خودرو'}];
      this.userService.car(id).subscribe((com: HttpResponse<DataModel5>) => {
        if (com.body.success === '1'){
          for (let i = 0; i < com.body.car_models.length; i++)
            this.listModels.push(com.body.car_models[i]);
          console.log('this.listModels');
          console.log(this.listModels);
        }else if (com.body.success === '-1') {
          this.alertCtrl.create({
            message: 'خطا در ورود به سامانه', buttons: [
              {
                text: 'تایید',
                role: 'cancel'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });
        }
      }, err => {
        this.errorMsg = 'خطا در ورود به سامانه:' + err.status;
        this.alertCtrl.create({
          message: 'خطا در ورود به سامانه', buttons: [
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
      console.log('123123');
    }
  }
 /* model(){

  console.log('id');
  console.log(id);
  this.userService.car(id).subscribe((com: HttpResponse<DataModel5>) => {
    if (com.body.success === '1'){
      this.listModels.concat(com.body.car_models);

    }else if (com.body.success === '-1') {
      this.alertCtrl.create({
        message: 'خطا در ورود به سامانه', buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }, err => {
    this.errorMsg = 'خطا در ورود به سامانه:' + err.status;
    this.alertCtrl.create({
      message: 'خطا در ورود به سامانه', buttons: [
        {
          text: 'تایید',
          role: 'cancel'
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  });
}*/
  addRecipe() {
    console.log(this.form);
    if (this.form.controls.company.value === '0'){
      this.alertCtrl.create({
        message: 'کمپانی خودرو را وارد کنید', buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });

    } else if (this.form.controls.model.value === '0') {
      this.alertCtrl.create({
        message: 'مدل خودرو را وارد کنید', buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    } else if (this.form.value.plate.plate2 === '00') {
      this.alertCtrl.create({
        message: 'پلاک خودرو را وارد کنید', buttons: [
          {
            text: 'تایید',
            role: 'cancel'
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    } else if (!this.form.valid) {
        if (this.form.controls.company.value === '0'){
          this.alertCtrl.create({
            message: 'کمپانی خودرو را وارد کنید', buttons: [
              {
                text: 'تایید',
                role: 'cancel'
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });

      } else if (!this.form.controls.model.valid) {
        this.alertCtrl.create({
          message: 'مدل خودرو را وارد کنید', buttons: [
            {
              text: 'تایید',
              role: 'cancel'
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      } else if (!this.form.controls.plate) {
        this.alertCtrl.create({
          message: 'پلاک خودرو را وارد کنید', buttons: [
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
      console.log(this.form);
      let car = this.form.value.plate.plate4;
      const car2 = this.form.value.plate.plate2;
      const car3 = this.form.value.plate.plate3;
      const car4 = this.form.value.plate.plate1;
      const car5 = car+ car2 + car3 + car4;
      console.log(car5);
      const final = {
        phone: localStorage.getItem('phoneNumber'),
        name: localStorage.getItem('name'),
        city_id: localStorage.getItem('town'),
        password: localStorage.getItem('password'),
        company_id: this.form.value.company,
        model_id: this.form.value.model,
        car_tag: car
      };
      console.log(final);
      this.loading.create({message: 'ذخیره سازی ...', keyboardClose: true}).then(load => {
        load.present();
          this.userService.confirm(final).subscribe((com: HttpResponse<DataModel2>) => {
            if (com.status === 200) {
              if (com.body.success === '1'){
                console.log(com.body);
                localStorage.setItem('token', com.body.token);
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: 'ثبت نام با موفقیت انجام شد', buttons: [
                    {
                      text: 'تایید',
                      handler: () => {
                        localStorage.removeItem('name');
                        localStorage.removeItem('phoneNumber');
                        localStorage.removeItem('password');
                        localStorage.removeItem('town');
                        this.router.navigate(['/', 'location-permision']);
                      }
                    }
                  ]
                }).then(alertEl => {
                  alertEl.present();
                });
              }
              if(com.body.success == '0') {
                this.loading.dismiss();
                this.alertCtrl.create({
                  message: 'خطا در ثبت اطلاعات', buttons: [
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
            this.errorMsg = 'خطا در ثبت اطلاعات:' + err.status;
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
    }
  }
}
