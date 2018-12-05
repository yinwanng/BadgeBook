import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Observable } from 'rxjs';
import { FireService } from '../fire.service';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  profileUrl: string;


  // imagePreview: string;
  public Editor = ClassicEditor;
  public isDisabled = true;
  public description = 'loading description';
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
  users: Observable<any[]>;
  UserNameList: any[];
  UserKeyList: [];
  DescList:[];
  filter:any;
  uid: any;
  name: any;
  //description: any;
  subkey:any

  constructor(private fire: FireService, private afStorage: AngularFireStorage) {}

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.fire.currentuid.subscribe(uid => {
      this.ref = this.afStorage.ref(this.uid);
    });

    this.task = this.ref.put(file);
    console.log(file);

    // get notified when the download URL is available
    this.task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL(); // {{ downloadURL | async }}
          this.downloadURL.subscribe(url => {
            this.profileUrl = url; // {{ profileUrl }}
            console.log(this.profileUrl);
          });
        })
      )
      .subscribe();
    console.log(file);
  }

  ngOnInit() {

    this.fire.getClientsInfo()
    this.fire.currentkey.subscribe(key=> this.subkey = key);
    this.fire.currentuid.subscribe(uid => {
      this.uid = uid
      console.log(this.uid)
    });
    this.fire.currentname.subscribe(name => this.name = name);
    this.fire.currentdescription.subscribe(description => {this.description = description;this.model.editorData = description});
    console.log(this.subkey)
    console.log(this.uid)


  }
  foo(){
    //this.fire.getClientsInfo("asaldivar18")
  }
}
