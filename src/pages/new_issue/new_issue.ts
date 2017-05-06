import {Camera} from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'new-issues-page',
  templateUrl: './new_issue.html'
})
export class CreateIssuePage {
  private addedImages:string[] = [];
  private newIssueForm: FormGroup;

  constructor(public navCtrl: NavController, private builder: FormBuilder, 
  private transfer: Transfer, private camera: Camera, private geolocation:Geolocation,
  private locationAccuracy: LocationAccuracy){
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
      this.camera.getPicture({
          quality: 50,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: this.camera.EncodingType.JPEG,
          saveToPhotoAlbum: false
      }).then((imageUrl) => {
          this.addedImages.push(imageUrl);
      }, (err) => {
          console.log(err);
      });
  }

  createIssue(){
    console.log("ok");
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

        if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            coordinates => {
                console.log(coordinates);   
            },
            error => console.log('Error requesting location permissions', error)
            );
        }

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
