import { Injectable } from '@angular/core';
import {take} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class loginRegister {
  reciveCode(phone){
    const phones = {phone: phone};
    return this.http.post('https://mappaye.com/sb/sign/sendCode.php',  phones,{observe: 'response'}).pipe(take(1));
  }
  validCode(code){
    const phones = {
      phone: localStorage.getItem('phoneNumber'),
      code: code
    };
    return this.http.post('https://mappaye.com/sb/sign/verifyCode.php',  phones,{observe: 'response'}).pipe(take(1));
  }

  login(code){

    return this.http.post('https://mappaye.com/sb/sign/login.php',  code,{observe: 'response'}).pipe(take(1));
  }
  listTown(){

    return this.http.post('https://mappaye.com/sb/services/getCities.php',{observe: 'response'}).pipe(take(1));
  }
  company(){

    return this.http.post('https://mappaye.com/sb/services/getCarCompanies.php', {observe: 'response'}).pipe(take(1));
  }
  car(id){

    return this.http.post('https://mappaye.com/sb/services/getCarModels.php', id, {observe: 'response'}).pipe(take(1));
  }
  confirm(code){

    return this.http.post('http://mappaye.com/sb/sign/register.php',  code,{observe: 'response'}).pipe(take(1));
  }
  constructor(private http: HttpClient) { }
}
