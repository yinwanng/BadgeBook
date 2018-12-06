import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireService } from '../fire.service';

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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,   
            private afAuth: AngularFireAuth,
            public cs: ChatService,
            private route: ActivatedRoute,
            public auth: AuthService,
            private fire: FireService
            ) {}

  ngOnInit() {
    this.fire.currentuid.subscribe(uid=> {
        this.userId = uid;
        console.log(this.userId);
      })
  }
    submit(chatId) {
      this.cs.sendMessage(chatId, this.newMsg);
      this.newMsg = '';
    }
  
    trackByCreated(i, msg) {
      return msg.createdAt;
  }
}
