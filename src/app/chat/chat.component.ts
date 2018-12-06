import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireService } from '../fire.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  errorMessage: Observable<any>
  newMsg: string;
  userId:any
  myId:any
  user:any
  forWhom:string;
  usersLocal:any[]=[]
  chatCollection:AngularFirestoreDocument
  chats:Observable<any>
  chatz:any[]=[]
  //checks width to show/hide side Users nav bar.
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,   
            private afAuth: AngularFireAuth,
            private db: AngularFirestore,
            public cs: ChatService,
            private route: ActivatedRoute,
            public auth: AuthService,
            private fire: FireService
            ) {
    

  }

  //puts uid and loads BadgeBook users into SideNavBar
  async ngOnInit() {
    this.fire.currentuid.subscribe(uid=> {
        this.myId = uid;
        console.log(this.myId);
    })

    this.fire.users.subscribe ( users=> {
      users.map( user => {
        this.usersLocal.push({name: user.name, uid: user.uid})
      })
    })

    const { uid } = await this.auth.getUser();
    const fs = this.db.firestore;
    fs.settings( {timestampsInSnapshots: true});
          
    const col = fs.collection("chats").doc(uid).get().then(
      snap => {

        this.chatz = snap.data().messages;
        this.chatz.sort(function(a,b){
          return a.createdAt - b.createdAt;
        });
        this.chatz.forEach( a=> {
          a.createdAt = a.toISOString()
        });
      }


    );

  }

  //submit message
  submit(message) {
      this.cs.sendMessage(this.userId, message);
  }
  
  //sort messages
  trackByCreated(i, msg) {
      return msg.createdAt;
  }

  //sets receiver's address.
  sendMessage(uid, username) {
    this.userId = uid;
    this.forWhom = username;
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
  }

}
