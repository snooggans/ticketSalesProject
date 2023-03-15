import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TourListComponent} from "../../components/tour-list/tour-list.component";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {RouterModule} from "@angular/router";
import {TourService} from "../../services/tour.service";




@NgModule({
  declarations: [
    TourListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectModule,
    RouterModule.forChild([
      {
        path: '', component: TourListComponent
      }
    ])
  ],
  providers: [TourService]
})
export class ToursModule { }
