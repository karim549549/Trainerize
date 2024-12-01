export  class Result<T>{
  isSuccess: boolean;
  data?: T;
  statusCode:  number ;
  message? :string ;

  constructor(isSuccess: boolean,data?: T, statusCode?: number, message?: string) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
}
