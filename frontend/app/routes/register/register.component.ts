import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  passwordErrors = "";
  usernameErrors = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //setInterval(() => console.log(this.validatePassword(), this.passwordErrors), 3000)
    if(this.authService.isAuthenticated())
      this.router.navigateByUrl("/points");
  }

  register() {
    //this.password.value.match(/^[a-zA-Z0-9]{3,}$/)
    console.log(this.validateUsername(), " ", this.validatePassword())
    if (this.validateUsername() && this.validatePassword()) {
      this.authService.doRegister(this.username.value, this.password.value, this.router);
    }
  }

  validateUsername(): boolean {
    if (this.username.value == "") {
      this.usernameErrors = "Придумайте логин!"
      return false;
    } else if (!this.username.value.match(/^[a-zA-Z0-9]+$/)) {
      this.usernameErrors = "Логин может состоять только из латинских букв и/или цифр!"
      return false;
    } else {
      this.usernameErrors = "";
      return true;
    }
  }

  validatePassword(): boolean {
    if (this.password.value == "") {
      this.passwordErrors = "Придумайте пароль!"
      return false;
    } else if (!this.password.value.match(/^.{3,}$/)) {
      this.passwordErrors = "Пароль должен состоять минимум из 3 символов!"
      return false;
    } else if (!this.password.value.match(/^[a-zA-Z0-9]{3,}$/)) {
      this.passwordErrors = "Пароль может состоять только из латинских букв и/или цифр!"
      return false;
    } else {
      this.passwordErrors = "";
      return true;
    }
  }

}
