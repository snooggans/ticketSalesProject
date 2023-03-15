import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TourService} from "../services/tour.service";

@Injectable({
  providedIn: 'root'
})
export class ToursResolver implements Resolve<boolean> {

  tours

  constructor(private tourService: TourService) {
  }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.tourService.getAllTours();
  }
}
