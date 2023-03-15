import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {TourService} from "../../services/tour.service";
import {UserService} from "../../services/user.service";
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  allOrders = null
  newOrders = null
  orders = null;
  onlyPending = true;
  user
  isAdmin
  orderIdSearch = ''
  userNameSearch = ''

  orderSubscribe: Subscription
  deleteOrderSubscribe: Subscription
  updateOrderStatusSubscribe: Subscription

  constructor(private orderService: OrderService,
              protected userService: UserService) {
  }


  ngOnInit() {

    this.user = this.userService.getActiveUserData();
    this.isAdmin = this.user.isAdmin;
    this.initOrders()
  }

  initOrders() {
    this.orderService.updateOrderList()
    this.orderSubscribe = this.orderService.orderSubject$.subscribe(orders => {
      if (this.isAdmin) {
        this.allOrders = orders;
      } else {
        this.allOrders = orders.filter(order => order.userID == this.user.id);
      }
      this.onOrderIdSearch();
      this.onUserNameSearch();
      if(this.onlyPending) this.onlyNewOrders()

    })
  }

  onlyNewOrders() {
    this.newOrders = this.allOrders.filter(order => order.status == 'pending')
    if (this.onlyPending) {
      this.userNameSearch = '';
      this.orderIdSearch = '';
      this.orders = this.newOrders
    } else {
      this.orders = this.allOrders
    }
  }

  onOrderIdSearch() {
    if (this.orderIdSearch.trim() && !this.userNameSearch) {
      this.onlyPending = false
      this.orders = this.allOrders.filter(order => order.orderId.toLowerCase().includes(this.orderIdSearch.toLowerCase()));
    } else {
      this.orders = this.allOrders
    }
  }

  onUserNameSearch() {
    if (this.userNameSearch.trim() && !this.orderIdSearch) {
      this.onlyPending = false
      this.orders = this.allOrders.filter(order => (order.fistName.toLowerCase() || order.lastName.toLowerCase()).includes(this.userNameSearch.toLowerCase()));
    } else {
      this.orders = this.allOrders;
      this.onOrderIdSearch()
    }
  }

  deleteOrder(id) {
    this.deleteOrderSubscribe = this.orderService.deleteOrder(id).subscribe(() => {
      this.orderService.updateOrderList()
    })
  }

  updateOrderStatus(id, status) {
   this.updateOrderStatusSubscribe = this.orderService.updateOrderStatus(id, status).subscribe(() => {
      this.orderService.updateOrderList()
    });
  }

  ngOnDestroy() {
    if(this.orderSubscribe) this.orderSubscribe.unsubscribe()
    if(this.deleteOrderSubscribe) this.deleteOrderSubscribe.unsubscribe()
    if(this.updateOrderStatusSubscribe) this.updateOrderStatusSubscribe.unsubscribe()
  }

}
