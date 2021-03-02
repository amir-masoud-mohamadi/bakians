import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {loginRegister} from "../../shared/service/login-register";
import {HttpResponse} from '@angular/common/http';
import {DataModel3} from "./data-model3";
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-town-list',
  templateUrl: './town-list.page.html',
  styleUrls: ['./town-list.page.scss'],
})
export class TownListPage implements OnInit {
  form: FormGroup;
  errorMsg;
  listTown: [{id: string, name: string}];
  listTwo: [{id: string, name: string}] = [{id:'1', name: 'ads'}];
  text ;
  flag =false;
  flagTown =true;
  constructor(private userService: loginRegister,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    if(localStorage.getItem('phoneNumber') !== undefined && localStorage.getItem('phoneNumber') !== null) {
      if(localStorage.getItem('name') !== undefined && localStorage.getItem('name') !== null) {
        this.form = new FormGroup({
          town: new FormControl(null, Validators.required)
        });
        this.userService.listTown().subscribe((com: DataModel3) => {
          console.log('1');

          if (com.success === '1') {
            console.log('2');
            this.listTown = com.cities;
            for (let i = 0; i < this.listTown.length; i++) {
              console.log(this.listTown[i].name);
            }
            console.log(this.listTown);
          }
          if (com.success == '-1') {

            this.alertCtrl.create({
              message: 'خطا در سیستم', buttons: [
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
          this.errorMsg = 'خطا در سیستم:' + err.status;
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
        this.router.navigate(['/', 'register']);
      }
    } else {
      this.router.navigate(['/', 'register']);
    }

  }

  segmentChanged(event){
    this.flagTown = true;
    console.log('flagTown1');
    console.log(this.flagTown);
    if(this.text = '') {

      this.listTwo = [{id: '1', name: 'ads'}];
      this.flag = false;

    } else {
      this.listTwo = [{id: '1', name: 'ads'}];

      for (let i = 0; i < this.listTown.length; i++) {
        if (this.listTown[i].name.indexOf(event.target.value)> -1) {

          this.flag = true;

          this.listTwo.push(this.listTown[i]);

        } else {


        }
      }
      console.log('flagTown1234');
      console.log(this.listTwo.length);
      if(this.listTwo.length === 1 || this.listTwo.length == 0){
        console.log('flagTown2');
        console.log(this.flagTown);
        this.flagTown = false;
        console.log('flagTown3');
        console.log(this.flagTown);
      }
      this.listTwo.splice(0,1);
    }
  }
  onClickTown(event){
    localStorage.setItem('town', event.id);
    this.router.navigate(['/', 'register', 'license-plate']);
  }
}
