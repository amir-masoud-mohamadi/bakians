export class DataModel {
    success: string;
    message: string;
    code: string;


  constructor(success: string, message: string, code: string) {
    this.success = success;
    this.message = message;
    this.code = code;
  }
}
