import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

//import { FirebaseAuth } from '@angular/fire';
import {FireService} from '../fire.service'
import * as firebase from 'firebase/app';
import { AES } from 'crypto-ts';
 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // imagePreview: string;
  public Editor = ClassicEditor;
  public isDisabled = true;
  public description = '<p>My name is Earl. I am fast and write PHP for BCIT schools. here is my loooong story ... . Here is my project screenshot<br>' + 
    'alt="Earl\'s project" id="imgProj"> </p>';
  public model = {
    editorData: this.description
  };
  public config = {
    toolbar: [
      { name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
      [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
      '/',
      { name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
    ]
  };
  toggleDisabled() {
    this.isDisabled = !this.isDisabled
    console.log(this.description);
  }
  public onChange( { editor }: ChangeEvent ) {
    this.description = editor.getData();
  }

  encryptedMessage = AES.encrypt('message', 'test').toString();


  errorMessage:String
  successMessage: String
  username:String
  email:String
  password:String
  key:String = AES.encrypt('message', 'test').toString();

  constructor(private authService:FireService) { }

  ngOnInit() {

  }
  newKey(){
this.key = AES.encrypt('message', 'test').toString();
  }

  tryRegister(){
    this.authService.doRegister({
        username:this.username, 
        email:this.email,
        password:this.password,
        key:this.key,
        description:this.description
      }).then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
