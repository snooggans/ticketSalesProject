import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {filter, map, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService,
              protected userService: UserService) {
  }

  orders ;
  orderSubscriber: Subscription;
  isAdmin: boolean;
  isUserLoggedIn: boolean

  ngOnInit() {
    this.userService.isloggedIn$.subscribe(data=>{
      this.isUserLoggedIn = data;
    })
    this.orderService.updateOrderList();
    this.userService.isAdmin$.subscribe(data=>this.isAdmin = data)
    this.orderSubscriber = this.orderService.orderSubject$
      .subscribe(orders=>{
        this.orders = orders.filter(order=>order.status == 'pending').length;
    })
  }

  ngOnDestroy() {
    this.orderSubscriber.unsubscribe()
  }
}
