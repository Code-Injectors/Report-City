import { AuthProvider } from './../../providers/AuthProvider';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import * as global from '../../app/globals';
import { IssuesListPage } from "../issues_list/issues_list";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, private builder: FormBuilder,
  private authProvider: AuthProvider, private storage: Storage) {
    this.loginForm = builder.group({
      'email': ['', Validators.required], //username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'password': ['', Validators.required]
    })
  }

  login() {
      if(this.loginForm.valid)
      {
        this.authProvider.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(success => {
            this.storage.set("token", success.token).then(token => {
                this.navCtrl.setRoot(IssuesListPage);
            });
            global.setUserId(success.userId);
        },
        err => {

        });
      }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
