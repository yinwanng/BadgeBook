import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'
import {Router} from '@angular/router'

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

  constructor(private authService:FireService,private router:Router) { }

  ngOnInit() {
  }
  foo(){
    //this.authService.getClientsInfo("asdf")
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
<<<<<<< HEAD
      this.router.navigate([''])
      
=======
      window.location.href = ''      
>>>>>>> 65de37111b85fdeaf44e28a37b5cdc0a04d24d0b
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }


}
