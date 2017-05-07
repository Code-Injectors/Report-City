import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: "comment-modal",
  templateUrl: "./comment-modal.html"
})
export class CommentModal {
  public comments;

  constructor(public viewCtrl: ViewController) {
      this.comments = this.viewCtrl.data.comments;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}