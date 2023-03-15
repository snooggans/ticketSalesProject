import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators,} from "@angular/forms";
import {IUser} from "../../models/user-model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit{

  constructor(private userService: UserService) {
  }

  userLoginForm: FormGroup;
  loginMessage = {status: '', text: ''};

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      userLogin: new FormControl('',[Validators.required]),
      userPwd: new FormControl('', Validators.required)
    })
  }

  onUserLoginFormSubmit(){
    const user: IUser  = {
      login: this.userLoginForm.value.userLogin,
      psw: this.userLoginForm.value.userPwd
    }
    this.userService.onUserLogin(user).subscribe(resp=>{

      this.loginMessage = {status: 'ok', text:'Вы успешно авторизовались'}
      setTimeout(()=>{
        this.userService.onUserLoggedIn(user);
      }, 1000)
    },
      error => {
        this.loginMessage = {status: 'err', text: 'Проверьте логин и пароль'}
    });
  }

}


