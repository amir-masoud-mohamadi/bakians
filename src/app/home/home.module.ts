import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { NgxMapboxGLModule } from 'mapir-angular-component';
import { HomePage } from './home.page';
import {ProductComponent} from './product/product.component';
import {SearchComponent} from './search/search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxMapboxGLModule,
    ReactiveFormsModule

  ],
  declarations: [HomePage, SearchComponent, ProductComponent]
})
export class HomePageModule {}
