import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {UserModule} from './models/user/user.module'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router'

import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class FireService {

  private usersCollection: AngularFirestoreCollection;

  /**
   * 
   */
  private uid= new BehaviorSubject<string>("");
  private name= new BehaviorSubject<string>("");
  private description= new BehaviorSubject<string>("");
  private kills = new BehaviorSubject<string>("");
  private key = new BehaviorSubject<string>("");
  private hscore = new BehaviorSubject<string>("");
  private hpercentile = new BehaviorSubject<string>("")
  
  users: Observable<any[]>;
  currentkills = this.kills.asObservable();
  currentuid = this.uid.asObservable();
  currentname = this.name.asObservable();
  currentdescription = this.description.asObservable();
  currentkey = this.key.asObservable()
  currenthscore= this.hscore.asObservable()
  currenthpercentile = this.hpercentile.asObservable()
  apptoken:string;
  
  filter:any;
  

  constructor(private db: AngularFirestore, 
              private afAuth: AngularFireAuth, 
              private http:HttpClient,
              private router:Router) {
   this.usersCollection = db.collection('users');
   this.users = db.collection('users').valueChanges();
   //afAuth.
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
        description:"student"
    }
    this.changeUser(info)
    this.getClientsInfo()
    //this.usersCollection.add(info);
    this.usersCollection.doc(this.afAuth.auth.currentUser.uid).set(info);
    this.router.navigate([''])
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

  // Get login information
  getClientsInfo(){
    var info
    this.users.subscribe(a=>a.forEach(user=>{
      if (user.uid == this.afAuth.auth.currentUser.uid){
         info = {
          uid: this.afAuth.auth.currentUser.uid,
          name: this.afAuth.auth.currentUser.displayName,
          apptoken: user.apptoken,
          description:user.description
        }
        this.changeUser(info)
        this.key.next(user.apptoken)
        this.http.get<any[]>('https://bbtankshooter.herokuapp.com/api/1.0/').subscribe(a=>{
          let found = false;
          a.forEach(user=>{
            //console.log(user.apptoken, this.key)
            if(user.apptoken == info.apptoken){
              console.log(user)
              found = true
              this.kills.next(user.kills)
          } 
          })
          if(!found)
          this.kills.next("0")
        })
        this.http.get<any[]>('https://comp4711-hangman-api.herokuapp.com/api/users').subscribe(a=>{
          let found = false
        a.forEach(user=>{
          //console.log(user)
          if(user.key == info.apptoken){
            found = true
            console.log(user)
            this.hscore.next(user.score)
            this.hpercentile.next(user.top)
          }
        })
          //console.log(a[0])

        })

        
      }
      }))


  }
  logout(){
    this.afAuth.auth.signOut()
  }


}
