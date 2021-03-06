import { Injectable } from '@angular/core';
import {take} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class loginRegister {
  reciveCode(phone){
    return this.http.post('http://bakian.ir/sb/sign/sendCode.php',  phone, {observe: 'response'}).pipe(take(1));
  }
  validCode(code){
    const phones = {
      phone: localStorage.getItem('phoneNumber'),
      code
    };
    return this.http.post('http://bakian.ir/sb/sign/verifyCode.php',  phones, {observe: 'response'}).pipe(take(1));
  }

  login(code){

    return this.http.post('http://bakian.ir/sb/sign/login.php',  code, {observe: 'response'}).pipe(take(1));
  }
  forget(code){
    const asd = {phone : code};

    return this.http.post('http://bakian.ir/sb/sign/sendCodeForget.php',  asd, {observe: 'response'}).pipe(take(1));
  }
  verifyForget(code){

    return this.http.post('http://bakian.ir/sb/sign/verifyCodeForget.php',  code, {observe: 'response'}).pipe(take(1));
  }
  passForget(code){

    return this.http.post('http://bakian.ir/sb/sign/changePassword.php',  code, {observe: 'response'}).pipe(take(1));
  }
  listTown(){

    return this.http.post('http://bakian.ir/sb/services/getCities.php', {observe: 'response'}).pipe(take(1));
  }
  company(){

    return this.http.post('http://bakian.ir/sb/services/getCarCompanies.php', {observe: 'response'}).pipe(take(1));
  }
  car(id){

    return this.http.post('http://bakian.ir/sb/services/getCarModels.php', id, {observe: 'response'}).pipe(take(1));
  }
  confirm(code){

    return this.http.post('http://bakian.ir/sb/sign/register.php',  code, {observe: 'response'}).pipe(take(1));
  }
  getBattery(code){

    return this.http.post('https://bakian.ir/sb/products/getProducts.php',  code, {observe: 'response'}).pipe(take(1));
  }
  constructor(private http: HttpClient) { }
}
