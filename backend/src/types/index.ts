import { Request } from "express";

export type Vote={
    name:string,
    voting_choice:boolean,
    casted_at:Date,
}
export interface ResponseTypes {
    date: string,
    count: number
}
export interface userI{
        id:string,
        role?:string,
        profileId:string
}

export interface CustomRequest extends Request {
    body: {
      email: string;
      name: string;
      role: "admin" | "user";
      password: string;
      conformPassword: string;
    };
  }