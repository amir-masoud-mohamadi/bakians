export class DataModel5 {
    success: string;
    car_models: [{id: string , name: string}];


  constructor(success: string, car_models: [{ id: string; name: string }]) {
    this.success = success;
    this.car_models = car_models;
  }
}
