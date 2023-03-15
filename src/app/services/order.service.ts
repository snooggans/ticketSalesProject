import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {IOrder} from "../models/order-moder";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  orderSubject = new Subject<any>();
  readonly orderSubject$ = this.orderSubject.asObservable()

  constructor(private http: HttpClient) {
  }

  addOrder(orderData: any): Observable<any>{
    return this.http.post("http://localhost:3000/orders/", orderData)
  }

  getAllOrders(): Observable<IOrder[]>{
     return this.http.get<IOrder[]>('http://localhost:3000/orders/')
  }

  updateOrderList(){
    this.getAllOrders().subscribe(data=>this.orderSubject.next(data));
  }

  updateOrderStatus(id, status): Observable<any>{
    return this.http.patch<IOrder[]>('http://localhost:3000/orders/' +id, {status})
  }

  deleteOrder(id): Observable<any>{
    return this.http.delete<IOrder[]>('http://localhost:3000/orders/' +id)
  }
}
