import { AuthProvider } from './../../providers/AuthProvider';
import { IssuesListPage } from './../issues_list/issues_list';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, private builder: FormBuilder,
  private authProvider: AuthProvider) {
    this.loginForm = builder.group({
      'email': ['', Validators.required], //username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'password': ['', Validators.required]
    })
  }

  login() {
      if(this.loginForm.valid)
      {
        this.authProvider.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(_data => {
          this.navCtrl.setRoot(IssuesListPage);
        },
        _err => {

        })
      }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
