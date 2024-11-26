export class AccessToken {
  accessToken: string
  expireAt : Date
  Role : string
  constructor(accessToken: string, expireAt: Date, Role: string) {
      this.accessToken = accessToken;
      this.expireAt = expireAt;
      this.Role = Role;
  }
}