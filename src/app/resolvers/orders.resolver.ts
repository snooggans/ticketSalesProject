import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {OrderService} from "../services/order.service";
import {TourService} from "../services/tour.service";
import {IOrder} from "../models/order-moder";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class OrdersResolver implements Resolve<any> {

  constructor(private orderService: OrderService) {
    this.orderService.updateOrderList();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return of('sdfsd')

  }
}
