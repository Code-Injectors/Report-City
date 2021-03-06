import { AuthProvider } from './../../providers/AuthProvider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup;
  constructor(public navCtrl: NavController, private builder: FormBuilder, private authProvider: AuthProvider) {
    this.registerForm = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')])], //username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'password': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    })
  }

  register() {
    if(this.registerForm.valid)
    {
      let data = {
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password,
        "firstName": this.registerForm.value.firstName,
        "lastName": this.registerForm.value.lastName
      }
      this.authProvider.register(data).subscribe(success => {
           alert("User created.");
        },
        err => {
          
        });
      }else {
      alert("Please fill all fields.");
    }
    
  }
}
