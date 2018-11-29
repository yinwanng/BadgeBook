import { Component, OnInit, Inject } from '@angular/core';
import { FireService} from '../fire.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.css']
})
export class TokenDialogComponent implements OnInit {
  token:String;
  uid:any

  constructor(
    public dialogRef: MatDialogRef<TokenDialogComponent>,
    private afs:FireService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  this.afs.currentkey.subscribe(token=>this.token=token)
  this.afs.currentuid.subscribe(uid => {
    this.uid = uid
    //console.log(this.uid)
  });
  }


  

}
