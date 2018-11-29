import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filter:any

  constructor(private afs:FireService,             
     public afAuth: AngularFireAuth,
     private router:Router
    ) { }

  ngOnInit() {
  }


  logout(){
    console.log("foo")
    this.afs.logout();
    this.router.navigate([''])
  }

  SearchUser(input)
  {
    //console.log("ok")
    this.afs.SearchUser(input);
  }

}
