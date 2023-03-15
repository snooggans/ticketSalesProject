import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TourService} from "../../services/tour.service";
import {ITour} from "../../models/tour-model";
import {UserService} from "../../services/user.service";
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-single-tour',
  templateUrl: './single-tour.component.html',
  styleUrls: ['./single-tour.component.scss']
})
export class SingleTourComponent implements OnInit, OnDestroy{

  route$: Subscription
  tourID: any = this.route.snapshot.paramMap.get('id');
  tour;
  formActive: boolean;
  data
  nearestTours
  nearestTours$: Subscription
  responsiveOptions

  constructor(private route: ActivatedRoute,
              private tourService: TourService,
              protected userService: UserService) {
  }

  ngOnInit() {
   this.route$ = this.route.params.subscribe(()=>{
      this.data = this.route.snapshot.data;
      this.tour = this.data.tour;
      this.nearestTours$ = this.tourService.getNearestTours(this.tour.country).pipe(map(tour=>tour.filter(tour=>tour._id != this.tour._id))).subscribe(tours=>this.nearestTours = tours);
    })


    this.responsiveOptions = [
      {
        breakpoint: '3440px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1280px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnDestroy() {
    this.route$.unsubscribe()
    this.nearestTours$.unsubscribe()
  }

}
