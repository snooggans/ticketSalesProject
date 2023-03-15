import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UserInfoComponent} from "../../components/user-info/user-info.component";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UserInfoComponent}])
  ]
})
export class UserInfoModule { }
