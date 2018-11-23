import { Component, OnInit } from '@angular/core';

import {FireService} from '../fire.service'
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  //selector: 'app-root',
    // template: `
    //     <ul>
    //         <li *ngFor="let item of items | async">
    //             <pre>{{ item | json }}</pre>
    //         </li>
    //     </ul>
    // `
})
  
export class ResultComponent implements OnInit {
  public NameList : String[];
  constructor(private afs : FireService) 
  {
    //afs.collection('people', ref => ref.where('name', '==', 'jeff') )
  }

  ngOnInit() {
    //let user = this.db.doc('/users/name');
    //console.log(user);
    this.NameList = this.afs.GetNameList();
    for(let i = 0 ; i < this.NameList.length; ++i)
    {
      this.createOneCart(this.NameList[i]);
    }
    //this.createOneCart(this.fire.SearchUser("Joseph", null));
    //this.createOneCart("Tim");
    //this.createOneCart("Alan");
    //this.createOneCart("Adiran");

  }
  createOneCart(name){
    let container = document.getElementById("topLayer");
    let card = document.createElement("div");
    let card_header = document.createElement("div");
    let row = document.createElement("div");
    let col = document.createElement("div");
    let col_Long = document.createElement("div");
    let image_center = document.createElement("div");
    let image = document.createElement("img");
    let card_body = document.createElement("div");
    let p = document.createElement("p");
    let a = document.createElement("a");

    card.setAttribute('class',"card");
    card_header.setAttribute('class',"card-header");
    //User Name
    //card_header.setAttribute('id',"");
    row.setAttribute('class',"row");
    col.setAttribute('class',"col");
    image_center.setAttribute('class',"text-center");
    //image
    image.setAttribute('src',"../../assets/img/johnny.jpeg");
    image.setAttribute('style',"border-radius:50%;width:100%;");
    //image.setAttribute('id',"");
    col_Long.setAttribute('class',"col-10");
    card_body.setAttribute('class',"card-body");
    //description
    p.setAttribute('class',"card-text");
    //p.setAttribute('id',"");
    a.textContent = "Check Him Out";
    //link to that user page
    a.setAttribute('href', "http://www.bcit.ca");
    a.setAttribute('class', "btn btn-primary");
    //a.setAttribute('id',"");

    container.appendChild(card);
    card.appendChild(card_header);
    card.appendChild(row);
    row.appendChild(col);
    col.appendChild(image_center);
    image_center.appendChild(image);
    row.appendChild(col_Long);
    col_Long.appendChild(card_body);
    card_body.appendChild(p);
    card_body.appendChild(a);

    p.textContent= "this is JS god";
    //console.log("Name = " + name);
    card_header.textContent = name;
  }
}
