export class  AuthResponse  {
  accessToken:string 
  refreshExpireAt:Date

  constructor(accessToken:string,refreshExpireAt:Date){
    this.accessToken = accessToken
    this.refreshExpireAt = refreshExpireAt
  }
}