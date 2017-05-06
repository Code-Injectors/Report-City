import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup;
  constructor(public navCtrl: NavController, private builder: FormBuilder) {
    this.registerForm = builder.group({
      'email': ['', Validators.required], //username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'password': ['', Validators.required],
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required]
    })
  }

  register() {
    
  }
}
