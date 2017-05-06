import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  login() {
      
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
