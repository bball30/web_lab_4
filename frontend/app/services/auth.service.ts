import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PointService} from "./point.service";
import {Router} from "@angular/router";
import {UserToken} from "../models/userToken";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private pointService: PointService
  ) { }

  doLogin(user: String, pass: String, router: Router) {
    const l = this.login(user, pass);
    l.subscribe(
      (data) => {
        let tk: UserToken = new UserToken(data.token);
        //console.log(tk);
        this.setSession(tk);
        localStorage.setItem('login', user.toString());
        this.pointService.updatePoints();
        router.navigateByUrl('../points');
      },
      error => {
        //console.log("now error is:", error.message);
        if (error.status == 400) {
          alert('Неверный логин или пароль');
        } else {
          alert('Ошибка сервера');
        }
      }
    );
    return l;
  }

  doRegister(user: String, pass: String, router: Router){
    const obs = this.register(user, pass);
      obs.subscribe(
        (data: any) => {
          console.log(data.message)
          //router.navigateByUrl('/');

          this.doLogin(user, pass, router);
        },
        error => {
          alert(error.error);
        }
      );
    return obs;
  }

  register(username: String, password: String) {
    return this.http.post<UserToken>(`${environment.api}/register`, {username, password});
  }

  login(username: String, password: String) {
    return this.http.post<UserToken>(`${environment.api}/login`, {username, password});
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  setSession(token: UserToken) {
    localStorage.setItem('token', token.token);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != undefined;
  }

  getLogin() {
    let tk: string | null = localStorage.getItem('token');
  }

}
