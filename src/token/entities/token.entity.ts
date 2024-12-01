import { User } from "@prisma/client";

export class  Token {
  id: string ; 
  userId: string ;
  type : string;
  createdAt : Date;
  expireAt : Date;
  user : User
  constructor(userId: string, type: string, expireAt: Date) {
    this.userId = userId;
    this.type = type;
    this.expireAt = expireAt;
  }
}