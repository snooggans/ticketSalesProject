import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {EditTourComponent} from "../../components/edit-tour/edit-tour.component";
import {SingleTourResolver} from "../../resolvers/single-tour.resolver";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: EditTourComponent, resolve:{tour: SingleTourResolver}}])
  ]
})
export class EditTourModule { }
