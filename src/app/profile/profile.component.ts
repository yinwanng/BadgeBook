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
  subkey:any

  constructor(private fire: FireService) {}

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
  }

  ngOnInit() {
    this.fire.getClientsInfo()
    this.fire.currentkey.subscribe(key=> this.subkey = key);
    this.fire.currentuid.subscribe(uid => {
      this.uid = uid
      
    });
    this.fire.currentname.subscribe(name => this.name = name);
    this.fire.currentdescription.subscribe(description => this.description = description);
    console.log(this.subkey)
    console.log(this.uid)

  }
  foo(){
    //this.fire.getClientsInfo("asaldivar18")
  }
}
