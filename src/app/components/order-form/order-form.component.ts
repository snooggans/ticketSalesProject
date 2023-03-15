import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {OrderService} from "../../services/order.service";
import {ITour} from "../../models/tour-model";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit{

  @Input() tourID: string;
  @Input() tour: ITour;
  @Input() isFormActive: boolean;
  @Output() isFormActiveOut = new EventEmitter<boolean>()


  tourOrderForm: FormGroup;
  activeUserData = this.userService.getActiveUserData();

  constructor(private userService: UserService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.initTourOrderForm()
  }

  initTourOrderForm(){
    this.tourOrderForm = new FormGroup({
      fistName: new FormControl(this.activeUserData.fistName, [Validators.required]),
      lastName: new FormControl(this.activeUserData.lastName, [Validators.required]),
      birthday: new FormControl(this.activeUserData.birthday, [Validators.required]),
      citizen: new FormControl(this.activeUserData.citizen, [Validators.required]),
      email: new FormControl(this.activeUserData.email, [Validators.required]),
      tourID: new FormControl(this.tourID, [Validators.required]),
      userID: new FormControl(this.activeUserData.id, [Validators.required]),
      orderDate: new FormControl(new Date()),
      status: new FormControl('pending'),
      tour: new FormControl(),
      orderId: new FormControl(( new Date().getFullYear() + '-'+ ('' + Math.random()).substring(2, 7)))
    })
  }

  onTourOrderFormSubmit(){
    this.tourOrderForm.patchValue({tour:this.tour})
    this.orderService.addOrder(this.tourOrderForm.getRawValue()).subscribe(()=>{
      this.isFormActive = false;
      this.isFormActiveOut.emit(false)
      this.orderService.updateOrderList();
      this.initTourOrderForm()
    })
  }

}
