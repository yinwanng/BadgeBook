import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
