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

  constructor(private fire: FireService, private db:AngularFirestore) {
    //this.fire.users =  this.users;
    //this.uid = 
    this.usersCollection = db.collection('users');
    this.users = db.collection('users').valueChanges();
  }


  displayProfile(user){
    console.log(user)
    this.fire.changeUser(user)
  }
  ngOnInit() {
    this.fire.currentuid.subscribe(uid => this.uid = uid);
    this.fire.currentname.subscribe(name => this.name = name);
    this.fire.currentdescription.subscribe(description => this.description = description);
    
  }

}
class Item{
  uid: string;
  name: string;
  description:string;
}
