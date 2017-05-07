import { CreateIssuePage } from './../new_issue/new_issue';
import { CommentModal } from './../../components/shared/comment-modal/comment-modal';
import { Component , OnInit} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FilterModal } from "../../components/shared/filter-modal/filter-modal";
import { ReportsProvider } from "../../providers/ReportsProvider";
import * as global from "../../app/globals";

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

  review(user_id, issue_index, voteStatus)
  {
    let hasSameVote = {index: -1, status: false};
    let hasVote = false;
    let comment = "";
    for(let i=0;i<this.reports[issue_index].reviews; i++)
    {
      if(this.reports[issue_index].reviews[i].user.id == global.user_id)
      {
        comment = this.reports[issue_index].reviews[i].comment;
        if(this.reports[issue_index].reviews[i].isUpvote == voteStatus)
        {
          hasSameVote.status = true;
        }
      }
    }

    if(hasSameVote.status)
    {
      //exeis idi kanei like / dislike
      return;
    }

    if(hasVote && !hasSameVote.status)
    {
      //tou allazw to like se dislike kai antistrofa
      this.reports[issue_index].reviews[hasSameVote.index].upvote == voteStatus;
    }

    if(voteStatus) {
      this.reports[issue_index].upVotes = this.reports[issue_index].upVotes + 1;
      this.reports[issue_index].downVotes = this.reports[issue_index].downVotes - 1;
    }
    else {
       this.reports[issue_index].downVotes = this.reports[issue_index].downVotes + 1;
       this.reports[issue_index].upVotes = this.reports[issue_index].upVotes - 1;
    }
    

    this.reportsProvider.review(
      {
        id:  this.reports[issue_index].id, 
        isUpvote: voteStatus,
        comment: comment,
        user: {id: user_id}
      }
    ).then(success => success.subscribe(success => {
          
        },
        err => {
          console.log(err);
        })
    );
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
