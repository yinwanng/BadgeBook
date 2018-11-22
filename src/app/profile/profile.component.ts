import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // imagePreview: string;
  public Editor = ClassicEditor;
  public isDisabled = true;
  public description = '<p>My name is Earl. I am fast and write PHP for BCIT schools. here is my loooong story ... . Here is my project screenshot<br>' + 
  '<img src="https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-512.png"' + 
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
  constructor() { }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled
    console.log(this.description);
  }
  public onChange( { editor }: ChangeEvent ) {
    this.description = editor.getData();
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
  }

  ngOnInit() {
  }
}
