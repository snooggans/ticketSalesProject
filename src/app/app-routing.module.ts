import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TourListComponent} from "./components/tour-list/tour-list.component";
import {AdminComponent} from "./components/admin/admin.component";
import {SingleTourComponent} from "./components/single-tour/single-tour.component";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tours/tours.module').then(m => m.ToursModule)
  },
  {
    path: 'tours/:id',
    loadChildren: () => import('./modules/single-tour/single-tour.module').then(m => m.SingleTourModule)
  },
  {
    path: 'edit-tour/:id',
      loadChildren: () => import('./modules/edit-tour/edit-tour.module').then(m => m.EditTourModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
