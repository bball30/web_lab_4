import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  usernameErrors = "";
  passwordErrors = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.router.navigateByUrl('/points');
  }

  async login() {
    console.log(this.validateUsername(), this.validatePassword())
    if (this.validateUsername() && this.validatePassword()) {
      this.authService.doLogin(this.username.value, this.password.value, this.router);
    }
  }

  validateUsername(): boolean {
    if (this.username.value == "") {
      this.usernameErrors = "Введите логин!"
      return false;
    } else {
      this.usernameErrors = "";
      return true;
    }
  }

  validatePassword(): boolean {
    if (this.password.value == "") {
      this.passwordErrors = "Введите пароль!"
      return false;
    } else {
      this.passwordErrors = "";
      return true;
    }
  }

}
