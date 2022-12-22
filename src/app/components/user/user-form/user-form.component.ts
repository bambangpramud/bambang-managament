import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  isConfirmDelete:boolean=false;
  showMore:boolean=false;
  showToast:boolean=false;
  @Input() user:IUser ={}as IUser;

  constructor(private userService:UserService,
    private toasterService:ToasterService
    ){
  
  }

  showToggle(){
    this.showMore=!this.showMore
  }

  save(){
    this.showMore=false;
    this.user = {}as IUser;
    this.isConfirmDelete=false;
  }

  setUser(user:IUser){
    this.user=JSON.parse(JSON.stringify(user));
  }

onCreate(){
this.userService.create(this.user)
.subscribe((response:IUser)=>{
  this.showMore=false;
  this.user={} as IUser;
  this.toasterService.showToast=true;
  this.toasterService.message=`berhasil menyimpan user ${response.username}`
});
}
onUpdate(){
this.userService.update(this.user)
.subscribe((response:IUser)=>{
  this.showMore=false;
  this.user={} as IUser;
  this.toasterService.showToast=true;
  this.toasterService.message=`berhasil mengupdate user ${response.username}`
});
}
onDelete(){
this.userService.delete(this.user.id)
.subscribe((response:IUser)=>{
  this.showMore=false;
  this.user={} as IUser;
  this.toasterService.showToast=true;
  this.toasterService.message=`berhasil menghapus user ${response.username}`
  this.isConfirmDelete=false;
});
}
}
