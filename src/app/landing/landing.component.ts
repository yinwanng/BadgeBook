import { Component, OnInit } from '@angular/core';
import {FireService} from '../fire.service'
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TokenDialogComponent } from '../token-dialog/token-dialog.component';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private _url = `https://comp4711-a1.herokuapp.com/api`;
  url2:any


  constructor(private afs:FireService,             
    public afAuth: AngularFireAuth,
    private http: HttpClient,
    public dialog: MatDialog
   ) { }
   
  ngOnInit() {
  }
  goLogin(){
    //document.getElementById("loginsect").
  
    window.location.href = 'login'
  }

  goToHangmanGame() {
    window.location.href = `https://comp4711-hangman.herokuapp.com/`;
  }

  goToTankGame() {
    window.location.href = `https://bbtankshooter.herokuapp.com/#`;
  }

  goToVideoChat() {
    let myHeaders = new Headers();
    myHeaders.append('token', 'badgebook'); 
    this.http.post(this._url, myHeaders).subscribe( (data:any) => { window.location.href = data.url });
    //window.location.href = `https://comp4711-a1.herokuapp.com/`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TokenDialogComponent, {
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}