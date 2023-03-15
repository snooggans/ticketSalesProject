import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  user
  oldPsw
  userForm: FormGroup
  newPasswordForm: FormGroup
  userSubscribe: Subscription
  oldPswSubscribe: Subscription
  msgsUserInfo
  msgsNewPsw
  disabled = false

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userSubscribe = this.userService.activeUserData$.subscribe(user => {
      this.user = user;
      this.initUserForm()
    })
    this.oldPswSubscribe = this.userService.getUserById(this.user.id).subscribe(user=>this.oldPsw = user.psw);
    this.msgsUserInfo = []
    this.msgsNewPsw = []
  }

  initUserForm() {
    this.userForm = new FormGroup({
      fistName: new FormControl(this.user.fistName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      birthday: new FormControl(this.user.birthday, [Validators.required]),
      citizen: new FormControl(this.user.citizen, [Validators.required]),
    });

    this.newPasswordForm = new FormGroup({
      newPsw: new FormControl('', [Validators.required, Validators.minLength(3)]),
      newPsw2: new FormControl('', [Validators.required,Validators.minLength(3)])
    })
  }

  addMessagesUserInfo(severity, summary, detail) {
    this.msgsUserInfo = [
      {severity, summary, detail}
    ];
    this.disabled = true
    setTimeout(() => {
      this.msgsUserInfo = [];
      this.disabled = false
    }, 2000)
  }

  addMessagesNewPsw(severity, summary, detail) {
    this.msgsNewPsw = [
      {severity, summary, detail}
    ];
    this.disabled = true
    setTimeout(() => {
      this.msgsNewPsw = [];
      this.disabled = false
    }, 2000)
  }


  onUserFormSubmit() {
    this.userService.updateUserInfo(this.user.id, this.userForm.getRawValue()).subscribe(
      next => {
        this.userService.getUserById(this.user.id)
          .subscribe(user => {
              this.userService.setActiveUserData(user)
              this.userService.updateUserData();
              this.addMessagesUserInfo('success', 'Обновлено', 'Ваши личные данные обновлены');
            }
          )
      },
      error => this.addMessagesUserInfo('error', 'Ошибка', 'Проверьте введённые данные')
    )
  }

  onNewPasswordFormSubmit() {
    const newPswForm  = this.newPasswordForm.getRawValue();
    if (newPswForm.newPsw != newPswForm.newPsw2){
      this.addMessagesNewPsw('error', 'Ошибка', 'Пароли не совпадают')
    }else{
      this.userService.updateUserPsw(this.user.id, newPswForm.newPsw).subscribe(
        next=>{this.addMessagesNewPsw('success', 'Обновлено', 'Пароль успешно обновлен')
          this.initUserForm()},
        error =>this.addMessagesNewPsw('error', 'Ошибка', error.error.errorText)
      )
    }
  }

  ngOnDestroy() {
    if (this.userSubscribe) this.userSubscribe.unsubscribe()
    if (this.oldPswSubscribe) this.oldPswSubscribe.unsubscribe()
  }
}
