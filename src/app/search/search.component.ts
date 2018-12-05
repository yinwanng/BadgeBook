import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FireService } from '../fire.service';
import {ProfileComponent} from '../profile/profile.component'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  
  private usersCollection: AngularFirestoreCollection;
  users: Observable<any[]>;
  UserNameList: any[];
  UserKeyList: [];
  DescList:[];
  filter:any;
  uid: any;
  name: any;
  description: any;
  results: any[];
  kills: any;
  hscore: any;
  hpercent: any;

  constructor(private fire: FireService, private db:AngularFirestore) {
    this.usersCollection = db.collection('users');
    this.users = db.collection('users').valueChanges();
  }

  ngOnInit() {
    this.fire.currentResults.subscribe(results=>{this.results = results; console.log(this.results)})
    this.fire.currentFilter.subscribe(filter=>this.filter = filter);
    this.fire.currentkills.subscribe(a=>{this.kills=a;console.log(this.kills)})
    this.fire.currenthscore.subscribe(a=>{this.hscore=a;console.log(this.hscore)})
    this.fire.currenthpercentile.subscribe(a=>this.hpercent=a)
  }

}
class Item{
  uid: string;
  name: string;
  description:string;
}
