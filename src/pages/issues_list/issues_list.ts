import { CreateIssuePage } from './../new_issue/new_issue';
import { CommentModal } from './../../components/shared/comment-modal/comment-modal';
import { Component , OnInit} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FilterModal } from "../../components/shared/filter-modal/filter-modal";
import { ReportsProvider } from "../../providers/ReportsProvider";

@Component({
  selector: 'issues-list-page',
  templateUrl: 'issues_list.html',
  providers: [ReportsProvider]
})
export class IssuesListPage implements OnInit{
  private reports;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public reportsProvider: ReportsProvider) {

  }

  ngOnInit() {
    this.reportsProvider.getReports().then(data => {
        data.subscribe(success => {
          this.reports = success.content;
        },
        err => {
          console.log(err);
        })
  
    });
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
