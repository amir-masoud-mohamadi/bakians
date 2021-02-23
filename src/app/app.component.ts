import { Component, OnInit } from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  listProduct;
  numberCart;
  public appPages = [
    {
      title: 'صفحه اصلی',
      url: '/',
      icon: 'home'
    },
    {
      title: 'ورود',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'ثبت نام',
      url: '/register',
      icon: 'create'
    },
    {
      title: 'سبد خرید',
      url: '/card',
      icon: 'basket'
    },
    {
      title: 'پروفایل',
      url: '/profile',
      icon: 'cog'
    },
    {
      title: 'خروج',
      url: '/folder/Trash',
      icon: 'power'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
  ) {
  }



  ngOnInit() {

  }




}
