import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private http: HttpClient) { }
  private _url = `https://comp4711-a1.herokuapp.com/api`;

  ngOnInit() {
  }
  goLogin() {
    window.location.href = 'login';
  }

  goToHangmanGame() {
    window.location.href = `https://comp4711-hangman.herokuapp.com/`;
  }

  goToTankGame() {
    window.location.href = `https://comp4711-hangman.herokuapp.com/`;
  }

  goToVideoChat() {
    let myHeaders = new Headers();
    myHeaders.append('token', 'badgebook'); 
    this.http.post(this._url, myHeaders).subscribe(data => window.location.href = data.url);
  }


}