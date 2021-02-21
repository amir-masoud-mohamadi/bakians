import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LicensePlatePageRoutingModule } from './license-plate-routing.module';

import { LicensePlatePage } from './license-plate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicensePlatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LicensePlatePage]
})
export class LicensePlatePageModule {}
