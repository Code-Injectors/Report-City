import { Camera } from 'ionic-native';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'new-issues-page',
  templateUrl: './new_issue.html'
})
export class CreateIssuePage {
  private newIssueForm: FormGroup;
  constructor(public navCtrl: NavController, private builder: FormBuilder){
      this.newIssueForm = builder.group({
      'title': ['', Validators.required], //username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'description': ['', Validators.required]
    })
    
  }

  takePicture() {
     Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        
    }, (err) => {
        console.log(err);
    });
  }

  createIssue(){

  }

  sendImage() {
   /*
    var options = new FileUploadOptions();
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "multipart/form-data";

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://some.server.com/upload.php"), win, fail, options);
    */
  }
}
