import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  flagClass= true;
  constructor() { }

  ngOnInit() {
  }
  clickpayment(){
    if(this.flagClass) {
      return;
    } else {
      this.flagClass = true;
    }
}
  clickpayment2(){
    if(!this.flagClass) {
      return;
    } else {
      this.flagClass = false;
    }
  }
}
