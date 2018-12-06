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
  //apptoken:string;
  filterResult: any[] = []
  filter:any;


  /**
   *
   */
  private uid= new BehaviorSubject<string>("");
  private name= new BehaviorSubject<string>("");
  private description= new BehaviorSubject<string>("");
  private photoLink= new BehaviorSubject<string>("");
  private kills = new BehaviorSubject<string>("");
  private key = new BehaviorSubject<string>("");
  private hscore = new BehaviorSubject<string>("");
  private hpercentile = new BehaviorSubject<string>("")
  private results = new BehaviorSubject<any[]>(this.filterResult);
  private filterInput = new BehaviorSubject<string>(this.filter)
  private apptoken = new BehaviorSubject<string>("")
  users: Observable<any[]>;
  currentkills = this.kills.asObservable();
  currentuid = this.uid.asObservable();
  currentname = this.name.asObservable();
  currentdescription = this.description.asObservable();
  currentPhotoLink = this.photoLink.asObservable();
  currentkey = this.key.asObservable()
  currenthscore= this.hscore.asObservable()
  currenthpercentile = this.hpercentile.asObservable()
  currentResults = this.results.asObservable();
  currentFilter = this.filterInput.asObservable();
  currentToken = this.apptoken.asObservable();




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
    this.photoLink.next(user.photoLink)
    this.uid.next(user.uid);
    this.apptoken.next(user.apptoken);
  }
  /**
   * Creates a new account using firebase auth
   * @param user Account
   * @returns Observable<>
   */
  doRegister(user){
    var name = user.username
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(a=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName: user.username,
        photoURL: ``
      })
      var info = {
        uid: this.afAuth.auth.currentUser.uid,
        name: name,
        apptoken: user.key,
        description: user.description,
        photoLink: user.photoLink
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
    var info;
    this.users.subscribe(a=>a.forEach(user =>{
      if (user.uid == this.afAuth.auth.currentUser.uid) {
         info = {
          uid: this.afAuth.auth.currentUser.uid,
          name: this.afAuth.auth.currentUser.displayName,
          apptoken: user.apptoken,
          description: user.description,
          photoLink: user.photoLink
        }
        this.changeUser(info)
        this.key.next(user.apptoken)
        this.http.get<any[]>('https://bbtankshooter.herokuapp.com/api/1.0/').subscribe(a=>{
          let found = false;
          a.forEach(user=>{
            if(user.apptoken == info.apptoken){
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
            this.hscore.next(user.score)
            this.hpercentile.next(user.top)
          }
        })
        })


      }
      }))
  }

  /**
   * Find users containing input
   * @param input query
   */
  SearchUser(input){
    this.filterInput.next(input);
    this.users.subscribe(UsersCollection=>{
        UsersCollection.forEach(user=>{
                let desc = user.description
                let name = user.name
                if (desc.includes(input)){
                  this.filterResult.push(user)
                } else if (name.includes(input)){
                  this.filterResult.push(user)
                }
          })
          this.results.next(this.filterResult)
        });
        this.router.navigate(['search']);
}
/**
 * Log out of firebase auth
 */
  logout(){
    this.afAuth.auth.signOut()
  }

  updatePhotoLink(photoLink){
    this.usersCollection.doc(this.afAuth.auth.currentUser.uid).update(
      {
        photoLink : photoLink
      }
    );
  }

  updateDescription(description){
    this.usersCollection.doc(this.afAuth.auth.currentUser.uid).update({ description: description });
  }


}
