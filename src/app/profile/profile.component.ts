import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: Observable<any[]>;
  UserNameList: any[];
  UserKeyList: [];
  DescList:[];
  filter:any;
  uid: any;
  name: any;
  description: any;

  constructor(private fire: FireService) {}

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
  }

  ngOnInit() {
    this.fire.currentuid.subscribe(uid => this.uid = uid);
    this.fire.currentname.subscribe(name => this.name = name);
    this.fire.currentdescription.subscribe(description => this.description = description);
  }
  foo(){
    console.log(this.description)
  }
}
