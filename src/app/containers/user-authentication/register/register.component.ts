import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
//import { UserDTO } from 'src/app/model/register.model';
import { UserserviceService } from 'src/app/services/userservice.service';
import { RegisterModel } from 'src/app/model/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user:RegisterModel=new RegisterModel();
  registerForm :FormGroup;
  constructor(private formBuilder:FormBuilder,private myservice:UserserviceService,private snackBar: MatSnackBar,private router:Router) { }
  //Form Builder is to validate Data Of Email or Password Type
  ngOnInit() {
    this.registerForm=this.formBuilder.group({
      'fname':[this.user.fname,[
        Validators.required
      ]],

      'lname':[this.user.lname,[
        Validators.required
      ]],

      'email':[this.user.email,[
        Validators.required,
        Validators.email
      ]],
      'password':[this.user.password,[
        Validators.required,
      
      ]],
      // this.myForm = this.fb.group({
      //   password: ['', [Validators.required]],
      //   confirmPassword: ['']
      // }, {validator: this.checkPasswords })
      'reTypePassword':[this.user.reTypePassword,[
        Validators.required,
      ]],
     
      
      'mob_number':[this.user.mob_number,[
        Validators.required,
        Validators.pattern('[6-9]\\d{9}')
      ]]
    });
    
  }
  fname = new FormControl("",Validators.required);
  lname =  new FormControl("",Validators.required);
  email  = new FormControl("", Validators.required);
  mob_number = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  reTypePassword =  new FormControl(this.password.value);

   getFirstNameErrorMessage() {
    return this.fname.hasError("required")
    ? "First name is required"
    : this.fname.hasError("pattern")
      ? ' '
      : "Please enter a valid first name";
  }

  getLastNameErrorMessage() {
    return this.lname.hasError("required")
    ? "Last name is required"
    : this.lname.hasError("pattern")
      ? "Please enter a valid last name"
      : " ";
  }

  getGmailErrorMessage() {
    return this.email.hasError("required")
    ? "Gmail id is required"
    : this.email.hasError("pattern")
      ? "Please enter a valid gmail id"
      : " ";
  }

  getMobileNumErrorMessage() {
    return this.mob_number.hasError("required")
    ? "Mobile num is required"
    : this.mob_number.hasError("pattern")
      ? "Please enter a valid last name"
      : " ";
  }

  getPassErrorMessage() {
    return this.password.hasError("required")
    ? "Password is required"
    : this.password.hasError("pattern")
      ? "Please enter a valid password"
      : " ";
  }

  getConPassErrorMessage() {
    return this.reTypePassword.hasError("required")
    ? "Confirm Password is required"
    : this.reTypePassword.hasError("pattern")
      ? "Password miss match ?"
      : " ";
  }

  onRegisterSubmit()
  {
  //  alert(this.user.email+' '+this.user.mobile) //this can be use for some alter agter user press register button
  //here we will call our rest api's
  console.log(this.user.email);
  (this.myservice.createUser(this.user)).subscribe(
    
      data => { 
        if(data.statusCode== 200)
        {
            this.snackBar.open('Successfully Register Please Confirm Your Email Address', 'LogIn', {
              duration: 2000});
              this.router.navigate(['/login']);
        }
        else{
        this.snackBar.open(data.statusMessage,"Register Fails",{
          duration:2000,})
        }},
        
       error => {
           console.log("Error", error);
       }

      );
       
  }

}
