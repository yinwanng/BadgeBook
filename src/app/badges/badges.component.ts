import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'
@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  kills:any

  constructor(private afs:FireService) { }

  ngOnInit() {
    this.afs.currentkills.subscribe(a=>{
      //console.log(a)
      this.kills=a;
    })
  }

  goToHangmanGame() {
    window.location.href = `https://comp4711-hangman.herokuapp.com/`;
  }

}
