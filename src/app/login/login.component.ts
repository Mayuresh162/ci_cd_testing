import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    'email': '',
    'password': ''
  };
  updatedUser = {
    'email': '',
    'password': ''
  };
  submitted = false;
  error = false;
  errorMsg = '';
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(public loginService: LoginService) {}

  ngOnInit() {
  }

  validateUser(loginData) {
    this.submitted = true;
    if (!this.user.email || !this.user.password) {
      this.error = true;
      this.errorMsg = 'Please fill the details';
    } else {
      this.updatedUser = this.user;
      this.error = false;
      this.loginService.getPost().subscribe(res => {
        console.log(res);
      });
    }
    // console.log('validate form', this.loginForm, this.user);
  }
}
