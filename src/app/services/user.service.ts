import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../models/user-model";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  activeUserData = new BehaviorSubject(this.getActiveUserData());
  readonly activeUserData$ = this.activeUserData.asObservable();

  isloggedIn = new BehaviorSubject(!!this.getActiveUserData());
  public readonly isloggedIn$ = this.isloggedIn.asObservable();

  isAdmin = new BehaviorSubject(!!this.getActiveUserData().isAdmin);
  public readonly isAdmin$ = this.isAdmin.asObservable();

  onUserLoggedIn(user){
    this.onUserLogin(user).subscribe( user=>{
      this.setActiveUserToken(user.access_token);
      this.getUserById(user.id).subscribe(user=>{
        this.setActiveUserData(user)
        this.isloggedIn.next(true);
        this.activeUserData.next(user);
        this.activeUserData.next(this.getActiveUserData())
        this.isAdmin.next(user.isAdmin)
      })
    })
  }

  onUserLogin(user): Observable<any>{
   return this.http.post <{access_token: string, id: string}>(`http://localhost:3000/users/${user.login}`, user)
  }

  userLogout(): void{
    window.localStorage.removeItem(`active_user_data`);
    this.removeActiveUserToken();
    this.isloggedIn.next(false)
    this.isAdmin.next(false)
    this.activeUserData.next({})
    this.router.navigate(['/']);
  }

  setActiveUserToken(token){
    window.localStorage.setItem(`access_token`, JSON.stringify(token));
  }

  removeActiveUserToken(){
    window.localStorage.removeItem(`access_token`);
  }

  getActiveUserToken(){
   return JSON.parse(window.localStorage.getItem(`access_token`));
  }

  setActiveUserData(user){
    window.localStorage.setItem(`active_user_data`, JSON.stringify(
      {
        id: user._id,
        fistName: user.fistName,
        lastName: user.lastName,
        birthday: user.birthday,
        email:user.email,
        citizen: user.citizen,
        isAdmin: user.isAdmin
      }
    ));
  }

  updateUserData(){
    this.activeUserData.next(this.getActiveUserData())
  }

  getActiveUserData(){
    if (JSON.parse(window.localStorage.getItem('active_user_data'))){
      return JSON.parse(window.localStorage.getItem('active_user_data'));
    }else {
      return false
    }
  }

  getUserById(id): Observable<any>{
    return this.http.get(`http://localhost:3000/users/${id}`)
  }

  userRegistration(user: IUser): Observable<any>{
    return this.http.post(`http://localhost:3000/users/`, user)
  }

  updateUserInfo(id, user): Observable<any> {
    return this.http.put(`http://localhost:3000/users/${id}`, user)
  }

  updateUserPsw(id, psw): Observable<any> {
    return this.http.patch(`http://localhost:3000/users/${id}`, {psw})
  }

}
