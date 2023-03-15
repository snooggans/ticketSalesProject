import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AddTourComponent} from "../../components/add-tour/add-tour.component";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TourService} from "../../services/tour.service";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {UserService} from "../../services/user.service"


@NgModule({
  declarations: [
    AddTourComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    RouterModule.forChild([{path: '', component: AddTourComponent}]),

  ],
  providers:[TourService, UserService],
  exports: [CommonModule]

})
export class AddTourModule { }
