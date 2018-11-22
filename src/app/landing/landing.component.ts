import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private afs:FireService,             
    private afAuth: AngularFireAuth
   ) { }
   
  ngOnInit() {
  }
  goLogin(){
    //document.getElementById("loginsect").
  
    window.location.href = 'login'
  }

  goToHangmanGame() {
    window.location.href = `https://comp4711-hangman.herokuapp.com/`;
  }

  goToTankGame() {
    window.location.href = `https://comp4711-hangman.herokuapp.com/`;
  }

  goToVideoChat() {
    window.location.href = `https://comp4711-a1.herokuapp.com/`;
  }

}