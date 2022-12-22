import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { IUser, IUserWrapper } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  users:Array<any>=[];
  user:IUser = {}as IUser;
  showMore:boolean=false;

  constructor(private userService:UserService){}
  ngOnInit(): void {
    console.log("uhuy");
    this.onAll();

  }

  onAll():void{
    this.userService.all().subscribe((response:IUserWrapper) =>{
      this.users=response.users;});
  }
  
  showToggle(){
    this.showMore=!this.showMore;
  }
  
  showDetail(p:IUser){
    this.user=p;
    // this.isDetailShow=!this.isDetailShow
  }
}
