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
    this.getAllReports();
  }

  getAllReports() {
     this.reportsProvider.getReports().then(data => {
        data.subscribe(success => {
          this.reports = success.content;
        },
        err => {
          console.log(err);
        })
  
    });
  }

  filterReports(searchEvent: any)
  {
    //TODO: Get data from backend
    let searchQuery = searchEvent.target.value;

    // if the value is an empty string don't filter the items
    if (searchQuery && searchQuery.trim() != '') {
         this.reportsProvider.getReports("?title="+searchQuery).then(data => {
            data.subscribe(success => {
              this.reports = success.content;
            },
            err => {
              console.log(err);
            })
        });
     }else {
       this.getAllReports();
     }
  }

  review(user_id, issue_index, voteStatus)
  {
    let hasSameVote = {index: -1, status: false};
    let hasVote = false;
    let comment = "";
    for(let i=0;i<this.reports[issue_index].allComments; i++)
    {
      if(this.reports[issue_index].reviews[i].user.id == global.user_id)
      {
        comment = this.reports[issue_index].reviews[i].comment;
        if(this.reports[issue_index].upvote == voteStatus)
        {
          hasSameVote.status = true;
          hasSameVote.index = i;
        }
      }
    }
    if(hasSameVote.status)
    {
      //exeis idi kanei like / dislike
      return;
    }

    if(hasVote)
    {
      //tou allazw to like se dislike kai antistrofa
      this.reports[issue_index].reviews[hasSameVote.index].upvote == voteStatus;
      if(voteStatus) {
        this.reports[issue_index].downVotes = this.reports[issue_index].downVotes - 1;
      }
      else {
        this.reports[issue_index].upVotes = this.reports[issue_index].upVotes - 1;
      }
    }

    if(voteStatus) {
      this.reports[issue_index].upVotes = this.reports[issue_index].upVotes + 1;
    }
    else {
       this.reports[issue_index].downVotes = this.reports[issue_index].downVotes + 1;
    }
    

    this.reportsProvider.review(
      {
        report:  {id: this.reports[issue_index].id}, 
        isUpvote: voteStatus,
        comment: comment,
        user: {id: user_id}
      }
    ).then(success => success.subscribe(success => {
          this.reports[issue_index].reviews.push(success);
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

  
  openCommentsModal(issue_index) {
    let modal = this.modalCtrl.create(CommentModal,{'comments': this.reports[issue_index].reviews});

    modal.onDidDismiss(newComment => {
      if(!newComment.comment){
        return;
      }
      this.reportsProvider.review({
        report:  {id: this.reports[issue_index].id}, 
        isUpvote: this.reports[issue_index].voteup,
        comment: newComment.comment,
        user: {id: this.reports[issue_index].creator.id}
      }).then(success => success.subscribe(success => {
          this.reports[issue_index].reviews.push(success);
        },
        err => {
          console.log(err);
        })
      );
    }) 
    modal.present();
  }

  goToNewIssue() {
    this.navCtrl.push(CreateIssuePage)
  }

}
