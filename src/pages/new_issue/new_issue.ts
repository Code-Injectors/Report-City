import {Camera} from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'new-issues-page',
  templateUrl: './new_issue.html'
})
export class CreateIssuePage {
  private addedImages:string[] = ["fadsf"];
  private newIssueForm: FormGroup;

  constructor(public navCtrl: NavController, private builder: FormBuilder, 
  private transfer: Transfer, private camera: Camera, private geolocation:Geolocation){
      this.newIssueForm = builder.group({
      'title': ['', Validators.required], 
      'description': ['', Validators.required]
    })
  }

  showAddFilesPopup() {
  }

  takePhoto() {
     this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType : this.camera.PictureSourceType.CAMERA
    }).then((imageUrl) => {
        this.addedImages.push(imageUrl);
    }, (err) => {
        console.log(err);
    });
  }

  selectPhoto() {

  }

  createIssue(){
    this.geolocation.getCurrentPosition().then(res => {
    console.log(res);
        this.sendImages();
    }).catch((error) => {
       //Please give your coordinates 
       alert("oups");
    });
  }

  sendImages() {
    for(let i=0; i<this.addedImages.length; i++)
    {
        const fileTransfer: TransferObject = this.transfer.create();

        var options: FileUploadOptions;
        options.params = {
          "type": this.addedImages[i].split(".")[1]
        }
        options.mimeType = "multipart/form-data";

        fileTransfer.upload(this.addedImages[i], 'http://localhost/ionic/upload.php', options)
        .then((data) => {
          // success
          alert("success");
        }, (err) => {
          // error
          alert("error"+JSON.stringify(err));
        });
    }
  }
}
