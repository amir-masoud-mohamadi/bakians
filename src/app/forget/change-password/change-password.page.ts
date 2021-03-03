import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(1)]),

    });
  }

}
