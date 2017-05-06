import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: "./filter-modal.html"
})
export class FilterModal {

  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}