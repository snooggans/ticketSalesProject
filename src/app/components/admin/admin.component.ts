import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Route, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  activeTab: string
  isUserLoggedIn
  isAdmin
  activeUser


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.activeTab = this.route.snapshot.firstChild.routeConfig.path
    });
    this.userService.isloggedIn$.subscribe(data=>{
      this.isUserLoggedIn = data;
      this.userService.activeUserData$.subscribe(data=>this.activeUser = data);
      this.userService.isAdmin$.subscribe(data=>this.isAdmin = data)
    })
  }

}
