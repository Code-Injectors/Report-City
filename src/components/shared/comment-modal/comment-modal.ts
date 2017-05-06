import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: "comment-modal",
  templateUrl: "./comment-modal.html",
  styleUrls: ['./comment-modal.scss']
})
export class CommentModal {
  public comments = [
      {
          "comment": "blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla",
          "user": "George Tzinos asd afsd fasd fas dfas df sadf asd",
          "email_hash": "fsad"
      },
       {
          "comment": "blabla",
          "user": "George Tzinos",
          "email_hash": "fsad"
      },
       {
          "comment": "blabla",
          "user": "George Tzinos",
          "email_hash": "fsad"
      },
       {
          "comment": "blabla",
          "user": "George Tzinos",
          "email_hash": "fsad"
      }
  ]

  constructor(public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}