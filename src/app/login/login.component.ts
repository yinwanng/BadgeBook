import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:String
  successMessage: String
  username:String
  email:String
  password:String

  constructor(private authService:FireService) { }

  ngOnInit() {
  }
  foo(){
    this.authService.getClientsInfo("asdf")
  }


  register(){
    window.location.href = 'register'
  }

  tryLogin(){
    console.log(
      this.username, 
      this.email,
      this.password
    )
    this.authService.doLogin({
      username:this.username, 
      email:this.email,
      password:this.password})
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      window.location.href = ""
      
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }


}
