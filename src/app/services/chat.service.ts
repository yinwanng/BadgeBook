import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}

  get(chatId) {
    console.log(chatId)
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  //create chat message count of bb user
  async create() {
    const { uid } = await this.auth.getUser();
    console.log('uid at async create {chatservice}' + uid)
    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['chats', docRef.id]);
  }

  //sends message to recipient under recipient's document id on chats collection
  async sendMessage(chatId, content) {
    const { uid } = await this.auth.getUser();
    const name = await this.afs.collection('users').doc(uid).get();
    console.log(name)

    const data = {

      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      console.log(chatId)
      console.log(uid)
      console.log(data)
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.set({
        messages: firestore.FieldValue.arrayUnion(data)
      }, {merge: true});
    }
  }

  //Retrieves user ids and combines messages sent to each other
  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};
  
    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));
  
        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );
  
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
  
        return chat;
      })
    );
  }

}