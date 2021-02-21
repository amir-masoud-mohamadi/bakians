export class DataModel4 {
    success: string;
    car_companies: [{id: string , name: string}];


  constructor(success: string, car_companies: [{ id: string; name: string }]) {
    this.success = success;
    this.car_companies = car_companies;
  }
}
