import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {StatisticComponent} from "../../components/statistic/statistic.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChartModule} from "primeng/chart";



@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: StatisticComponent}]),
    TableModule,
    ButtonModule,
    RippleModule,
    ChartModule
  ]
})
export class StatisticModule { }
