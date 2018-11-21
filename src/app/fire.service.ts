import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable,BehaviorSubject } from 'rxjs';
import {UserModule} from './models/user/user.module'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

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
  

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
   this.usersCollection = db.collection('users');
   this.users = db.collection('users').valueChanges();
  }

  changeUser(user){
    //this.auth.
    this.name.next(user.name)
    this.description.next(user.description)
    this.uid.next(user.uid);
  }
  doRegister(user){
    //console.log(user)
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
  }
  doLogin(user){
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }


}
