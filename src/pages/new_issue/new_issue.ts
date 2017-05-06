import {Camera} from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@Component({
  selector: 'new-issues-page',
  templateUrl: './new_issue.html'
})
export class CreateIssuePage {
  private addedImages = [];
  private newIssueForm: FormGroup;

  constructor(public navCtrl: NavController, private builder: FormBuilder, private transfer: Transfer, private camera: Camera){
      this.newIssueForm = builder.group({
      'title': ['', Validators.required], 
      'description': ['', Validators.required]
    })
  }

  takePicture() {
     this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType : this.camera.PictureSourceType.CAMERA,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageUrl) => {
        this.addedImages.push(imageUrl);
    }, (err) => {
        console.log(err);
    });
  }

  createIssue(){
    this.sendImages();
  }

  sendImages() {

    let options = {
      quality: 100
    };

    for(let i =0; i< this.addedImages.length; i++)
    {

        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:

        const fileTransfer: TransferObject = this.transfer.create();

        let options1: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'name.jpg',
            headers: {}
        }

        fileTransfer.upload(this.addedImages[i], 'http://localhost/ionic/upload.php', options1)
          .then((data) => {
            // success
            alert("success");
          }, (err) => {
            // error
            alert("error"+JSON.stringify(err));
          });
        });
    }
  }
}
