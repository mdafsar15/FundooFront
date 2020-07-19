import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
//import { LoginModel } from 'src/app/model/login.model';
import { UserserviceService } from 'src/app/services/userservice.service';
import { UserModel } from 'src/app/model/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loginmodel:UserModel=new UserModel();
  constructor(private snackBar: MatSnackBar,private formBuilder:FormBuilder,private myservice:UserserviceService,private router:Router) {         
  }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      'email':[this.loginmodel.email,[
        Validators.required,
        Validators.email
      ]],
      'password':[this.loginmodel.password,[
        Validators.required,
      ]]
    });
  }

  onLoginSubmit()
  {
    console.log(this.loginmodel.email);
    this.myservice.loginUser(this.loginmodel).subscribe(

      (response :any) =>{
        
        if(response.body.statusCode ==200)
        { 
          this.snackBar.open(response.body.message,'Successfully Logged in. Welcome!',{
            duration:2000})
            this.router.navigate(['/dashboard']);
           
           localStorage.setItem("token", response.body.token);
          // localStorage.setItem('firstName',response.firstName);
          console.log(response.body.token);
       // console.log('Token valid: ', response.obj);
        }
        else{
          this.snackBar.open(response.statusMessage,"Invalid Credentials",{
            duration:2000,})
          }},

          error =>{
            console.log("Error",error);
          }
    );
  }
}
