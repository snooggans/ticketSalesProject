import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleTourComponent} from "../../components/single-tour/single-tour.component";
import {RouterModule} from "@angular/router";
import {AppModule} from "../../app.module";
import {OrderFormComponent} from "../../components/order-form/order-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {resolve} from "chart.js/helpers";
import {SingleTourResolver} from "../../resolvers/single-tour.resolver";
import {CarouselModule} from "primeng/carousel";



@NgModule({
  declarations: [
    SingleTourComponent,
    OrderFormComponent
  ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{path: '', component: SingleTourComponent, resolve: {tour: SingleTourResolver}}
		]),
		InputTextModule,
		CarouselModule
	]
})
export class SingleTourModule { }
