import { Component, OnInit } from "@angular/core";
import { FireService } from "../fire.service";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TokenDialogComponent } from "../token-dialog/token-dialog.component";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  private _url = "https://comp4711-a1.herokuapp.com/api/";
  //private _urltank = "http://localhost:3000/api/1.0/login"
  private _urltank = "https://bbtankshooter.herokuapp.com/api/1.0/login";
  private _urlhangman = "https://comp4711-hangman.herokuapp.com/external.php";
  url2: any;
  token: any;

  constructor(
    private afs: FireService,
    public afAuth: AngularFireAuth,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.afs.currentkey.subscribe(token => {
      this.token = token;
      console.log(this.token);
    });
  }
  goLogin() {
    //document.getElementById("loginsect").

    window.location.href = "login";
  }

  goToHangmanGame() {
    const myHeaders = {
      apptoken: this.token,
      clientkey: "hangman4711"
    };
    this.http.post<any>(this._urlhangman, myHeaders).subscribe((data: any) => {
      console.log(data);
      window.open(data.url);
    });
  }

  goToTankGame() {
    let myHeaders = {
      token: this.token
    };
    this.http
      .post<any>(this._urltank + "/" + this.token, myHeaders)
      .subscribe((data: any) => {
        console.log(data);
        window.open(data.url);
      });
  }

  goToVideoChat() {
    let myHeaders = new Headers();
    myHeaders.append("token", "badgebook");
    this.http.post(this._url, myHeaders).subscribe((data: any) => {
      window.location.href = data.url;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TokenDialogComponent, {
      width: "25%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
