import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable,BehaviorSubject } from 'rxjs';
import {UserModule} from './models/user/user.module'


@Injectable({
  providedIn: 'root'
})
export class FireService {

  private usersCollection: AngularFirestoreCollection;
  users: Observable<any[]>;
  filter:any;
  private uid= new BehaviorSubject<string>("");
  private name= new BehaviorSubject<string>("");
  private description= new BehaviorSubject<string>("");
  currentuid = this.uid.asObservable();
  currentname = this.name.asObservable();
  currentdescription = this.description.asObservable();
  

  constructor(private db: AngularFirestore) {
   this.usersCollection = db.collection('users');
   this.users = db.collection('users').valueChanges();
  }

  changeUser(user){
    this.name.next(user.name)
    console.log(user.description)
    this.description.next(user.description)
    this.uid.next(user.uid);
  }


}
