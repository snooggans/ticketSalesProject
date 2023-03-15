import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/user-model";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit{

  isAdmin;

  constructor(private userService: UserService) {
  }

  isUserLoggedIn: boolean
  activeUser

  ngOnInit() {
    this.userService.isloggedIn$.subscribe(data=>{
      this.isUserLoggedIn = data;
      this.userService.activeUserData$.subscribe(data=>{
        this.activeUser = data;
        this.isAdmin = data.isAdmin
      })
    })
  }

  onLogout() {
    this.userService.userLogout()
  }
}
