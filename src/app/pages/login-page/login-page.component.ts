import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin, ILoginToken } from 'src/app/interfaces/i-login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  lastURL:string|null="";
  defaultURL:string="dashboard";
  requiredForm:FormGroup;
  messageError:string="";
user:ILogin={
  username:"",
  password:""
};

// ss

constructor(private loginService:LoginService,
              private storageService:StorageService  ,
              private router:Router
              ,private activatedRoute:ActivatedRoute
              // ,private fb:FormBuilder
              ,private toasterService:ToasterService
  ){
  
    this.requiredForm = new FormGroup({
      username: new FormControl(this.user.username,[
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(5)
      ]),
      
    })
}


ngOnInit(){
this.activatedRoute.queryParamMap.subscribe(
  (params) =>{
    this.lastURL=params.get('lastURL');
  }
)
}

private handleError(error:HttpErrorResponse){
  console.log(error.message);
  this.messageError=error.message;
  this.toasterService.message=error.message;
  this.toasterService.showToast = true;
  return throwError(()=> new Error('something bad happen 112'))
}

onLogin(){
  this.loginService.login(this.user)
  .pipe(
    catchError(this.handleError)
  )
.subscribe((response:ILoginToken) =>{
  // console.log(response);
  this.storageService.save("TOKEN",response.token);
  this.storageService.save("USERNAME",response.username);
  this.storageService.save("PHOTO_PROFILE",response.image);
if(this.lastURL){
  this.router.navigate([this.lastURL])
}else{
  this.router.navigate([this.defaultURL])
}
},
(error:any)=>{
  console.log(error.message);
  this.messageError = error.message;
})
}

}
