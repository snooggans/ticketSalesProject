import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;

  constructor(private userService: UserService) {
  }

  msgsUserReg;
  disabled

  ngOnInit() {
    this.userRegistrationForm = new FormGroup({

      fistName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      psw: new FormControl('', [Validators.required, Validators.minLength(3)]),
      birthday: new FormControl('', [Validators.required]),
      citizen: new FormControl('Россия', [Validators.required]),
      isAdmin: new FormControl(false)
    })
  }

  addMessagesUserReg(severity, summary, detail) {
    this.msgsUserReg = [
      {severity, summary, detail}
    ];
    this.disabled = true
    setTimeout(() => {
      this.msgsUserReg = [];
      this.disabled = false
    }, 3000)
  }

  onUserRegistrationFormSubmit() {
    this.userService.userRegistration(this.userRegistrationForm.getRawValue()).subscribe(data => {
        this.addMessagesUserReg('success', 'Вы успешно зарегистрировались', '');
        setTimeout(()=>{
          this.userService.onUserLoggedIn(data);
          this.userService.isloggedIn.next(true)
        },2000)
      },
      error => this.addMessagesUserReg('error', 'Логин занят', '')
    );
  }
}
