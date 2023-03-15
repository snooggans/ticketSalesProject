import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "../../components/admin/admin.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminComponent, children: [
          {
            path: 'add-tour',
            loadChildren: () => import('../add-tour/add-tour.module').then(m => m.AddTourModule)
          },
          {
            path: 'orders',
            loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule)
          },
          {
            path: 'statistic',
            loadChildren: () => import('../statistic/statistic.module').then(m => m.StatisticModule)
          },
          {
            path: 'user-info',
            loadChildren: () => import('../user-info/user-info.module').then(m => m.UserInfoModule)
          }
        ]
      },
    ])
  ]
})
export class AdminModule { }
