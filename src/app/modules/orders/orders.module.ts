import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {OrderListComponent} from "../../components/order-list/order-list.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {OrdersResolver} from "../../resolvers/orders.resolver";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    OrderListComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild([{path: '', component: OrderListComponent}]),
		InputSwitchModule,
		FormsModule,
		InputTextModule
	]
})
export class OrdersModule { }
