import { Component, OnInit } from '@angular/core';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users:any;

  constructor(private afs:FireService) { }

  ngOnInit() {
    this.afs.users.subscribe(users=>this.users = users)
  }

  //hello chat
}
