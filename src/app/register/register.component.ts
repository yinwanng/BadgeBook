import { Component, OnInit } from '@angular/core';
//import { FirebaseAuth } from '@angular/fire';
import {FireService} from '../fire.service'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage:String
  successMessage: String
  username:String
  email:String
  password:String

  constructor(private authService:FireService) { }

  ngOnInit() {
  }

  tryRegister(value){
    console.log(
      this.username, 
      this.email,
      this.password
    )
    this.authService.doRegister(
      {
        username:this.username, 
        email:this.email,
        password:this.password
      }).then(res => {
      window.location.href = ""
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
