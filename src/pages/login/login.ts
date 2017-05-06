import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  private email = "";
  private password = "";
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, private builder: FormBuilder) {
    this.loginForm = builder.group({
      'email': ['', Validators.required], //username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'password': ['', Validators.required]
    })
  }

  login() {
      if(this.loginForm.valid)
      {
        console.log("nekkon");
      }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
