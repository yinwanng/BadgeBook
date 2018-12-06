import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'
@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  kills:any
  hscore:any
  hpercent:any
  private _urlhangman = "https://comp4711-hangman.herokuapp.com/external.php";
  token: any;
  constructor(private afs:FireService) { }

  ngOnInit() {
    this.afs.currentkills.subscribe(a=>{
      //console.log(a)
      this.kills=a;
    })
    this.afs.currenthscore.subscribe(a=>{this.hscore=a})
    this.afs.currenthpercentile.subscribe(a=>this.hpercent=a)
    this.afs.getClientsInfo()
    this.afs.currentkey.subscribe(token => {
      this.token = token;
      console.log(this.token);
    });
  }

  goToHangmanGame() {
    window.location.href =
     this._urlhangman + `?clientkey=hangman4711&apptoken=` + this.token;
  }

}
