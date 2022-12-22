export interface IUser {
     
      id:number;
      firstName:string;
      lastName:string;
      maidenName:string;
      age?:number;
      gender?:string;
      email?:string;
      phone?:string;
      username?:string;
      password?:string;


}

export interface IUserWrapper{
    users:Array<IUser>;
    total:number;
    skip:number;
    limit:number;
}
