import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: "comment-modal",
  templateUrl: "./comment-modal.html"
})
export class CommentModal {
  public comments;
  private newComment;
  constructor(public viewCtrl: ViewController) {
      this.comments = this.viewCtrl.data.comments;
      this.newComment = "";
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendComment() {
      this.viewCtrl.dismiss({"comment": this.newComment});
  }

}