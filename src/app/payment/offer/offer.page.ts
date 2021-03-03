import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  closePage() {
    this.router.navigate(['/', 'payment']);
  }
}
