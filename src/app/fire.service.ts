import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  private kills = new BehaviorSubject<string>("");
  currentkills = this.kills.asObservable();
  currentuid = this.uid.asObservable();
  currentname = this.name.asObservable();
  currentdescription = this.description.asObservable();
  key:any
  

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private http:HttpClient) {
   this.usersCollection = db.collection('users');
   this.users = db.collection('users').valueChanges();
  }
/**
 * Update info
 * @param user Current User
 */
  changeUser(user){
    this.name.next(user.name)
    this.description.next(user.description)
    this.uid.next(user.uid);
  }
  /**
   * Creates a new account using firebase auth
   * @param user Account
   * @returns Observable<> 
   */
  doRegister(user){
    var name = user.username
    console.log(user)
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(a=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName:user.username,
        photoURL:""
      })
      var info = {
        uid: this.afAuth.auth.currentUser.uid,
        name: name,
        apptoken: "adrian123fefe",
    }
    console.log(info);
    this.usersCollection.add(info);
    this.usersCollection.doc(this.afAuth.auth.currentUser.uid).set(info);
    })

}

  /**
   * Login with Firebase Credentials
   */
  doLogin(user){
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(a=>{
      this.name.next(this.afAuth.auth.currentUser.displayName)
      
    });
  }

  getClientsInfo(key){
    
    this.key = key
    return this.http.get<any[]>('https://bbtankshooter.herokuapp.com/api/1.0/').subscribe(a=>{
      a.forEach(user=>{
        console.log(user.apptoken, this.key)
        if(user.apptoken == key){
          this.kills.next(user.kills)
          //this.currentkills=user.kills
          console.log(this.currentkills)
      }

      
        
      })
    })
  }
  logout(){
    this.afAuth.auth.signOut()
  }


}
