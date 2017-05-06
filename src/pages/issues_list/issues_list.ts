import { CreateIssuePage } from './../new_issue/new_issue';
import { CommentModal } from './../../components/shared/comment-modal/comment-modal';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FilterModal } from "../../components/shared/filter-modal/filter-modal";

@Component({
  selector: 'issues-list-page',
  templateUrl: 'issues_list.html'
})
export class IssuesListPage {
  private reports = [{
    "title": "report 1",
    "category":"category 1",
    "description": "description description description description descriptiondescription",
    "likes": 10,
    "dislikes": 20,
    "comments": ["fsad","fsadf","fasdf"]
  }, {
    "title": "report 2",
    "category":"category 1",
    "description": "description description description description descriptiondescription",
    "likes": 10,
    "dislikes": 20,
    "comments": ["fsad","fsadf","fasdf"]
  }, {
    "title": "report 2",
    "category":"category 1",
    "description": "description description description description descriptiondescription",
    "likes": 10,
    "dislikes": 20,
    "comments": ["fsad","fsadf","fasdf"]
  }];

  private user = {
    "email_hash": "fsda"
  }
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  getReports(searchEvent: any)
  {
    //TODO: Get data from backend

    let searchQuery = searchEvent.target.value;

    // if the value is an empty string don't filter the items
    if (searchQuery && searchQuery.trim() != '') {
      this.reports = this.reports.filter((item) => {
        return (item.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
      })
    }
  }

  showFilterModal()
  {
    let modal = this.modalCtrl.create(FilterModal);
    modal.present();
  }

  
  openCommentsModal(report_id) {
    let modal = this.modalCtrl.create(CommentModal);
    modal.present(); 
  }

  goToNewIssue() {
    this.navCtrl.push(CreateIssuePage)
  }

}
