import * as globals from '../../app/globals';
import { ReportsProvider } from './../../providers/ReportsProvider';
import {Camera} from '@ionic-native/camera';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'new-issues-page',
  templateUrl: './new_issue.html',
  providers: [ReportsProvider,Geolocation,LocationAccuracy]
})
export class CreateIssuePage implements OnInit{
  private addedImages:string[] = [];
  private newIssueForm: FormGroup;
  private categories = [];

  constructor(public navCtrl: NavController, private builder: FormBuilder, 
  private transfer: Transfer, private camera: Camera,
  private reportsProvider: ReportsProvider, private geolocation: Geolocation, private locationAccuracy:LocationAccuracy){
      this.newIssueForm = builder.group({
      'title': ['', Validators.required], 
      'description': ['', Validators.required],
      'selectedCategory': ['', Validators.required]
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

  ngOnInit() {
        this.reportsProvider.getReportCategories().then(data => {
            data.subscribe(success => {
              this.categories = success.content;
            },
            err => {
              console.log(err);
            })
        });
  }

  createIssue(){
      if(this.newIssueForm.valid)
      {
          /*
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            if(canRequest) {
                console.log(canRequest);
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                requestobj => { */
                 /*   this.geolocation.getCurrentPosition(coordinates => {
                        console.log(coordinates); */
                        let data = {
                            'title': this.newIssueForm.value.title,
                            "description": this.newIssueForm.value.description,
                            "creator": {id: globals.user_id},
                            "category": {id: this.newIssueForm.value.selectedCategory}
                        }

                         this.reportsProvider.createReport(data).then(data => {
                            data.subscribe(success => {
                                this.categories = success.content;
                                if(Object.keys(this.addedImages).length)
                                {
                                    this.sendImages(success.id);
                                }
                            },
                            err => {
                                console.log(err);
                            })
                        });
               /*         console.log(coordinates);
                        this.reportsProvider.createReport(data).then(data => {
                            data.subscribe(success => {
                            this.categories = success.content;
                            },
                            err => {
                                console.log(err);
                            })
                        });
                    }) */
                   /* error => console.log('Error requesting location permissions', error) });*/
            }
            else
            {
                alert("Please fill in necessary fields.")
            }
  }

  sendImages(report_id: string) {
    for(let i=0; i<this.addedImages.length; i++)
    {
        this.reportsProvider.getMediaId().then(mediasuccess=>{mediasuccess.subscribe(media => {

            const fileTransfer: TransferObject = this.transfer.create();

            var options: FileUploadOptions = {};
            options.params = {
                "type": this.addedImages[i].split(".")[1]
            }
            options.mimeType = "multipart/form-data";

            fileTransfer.upload(this.addedImages[i], '/media/' + media.id , options)
            .then((data) => {
            alert("success");
            }, (err) => {
            alert("error"+JSON.stringify(err));
            });
        })})
    }
  }
}
