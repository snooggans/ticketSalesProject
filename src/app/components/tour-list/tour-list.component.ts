import {AfterContentInit, AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITour} from "../../models/tour-model";
import {TourService} from "../../services/tour.service";
import {Observable, of, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit, OnDestroy {

  tourSearch: string = '';
  foundTours: ITour[] = [];
  foundTours$
  foundToursByLoc: ITour[] = [];
  foundToursByTo: ITour[] = [];
  tourOperatorFilter = 'Все туроператоры';
  locationFilter = 'Все локации'
  tourOperators: any = [];
  countries: any;
  formatedCountries: any = [];
  selectedCountries: any = [];
  places: any;
  formatedPlaces: any = [];
  selectedPlaces: any = [];
  isActivePlaces = false
  tours: ITour[] = [];
  tours$: Subscription
  tourDelete$: Subscription
  isAdmin

  constructor(private tourService: TourService,
              public userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadTours();
    this.userService.isAdmin$.subscribe(data=>this.isAdmin = data)
  }

  ngOnDestroy() {
    if (this.tours$) this.tours$.unsubscribe()
    if (this.tourDelete$) this.tourDelete$.unsubscribe()
  }

  loadTours() {
    this.tourService.updateTours();
    this.tours$ = this.tourService.toursSubject$.subscribe(data => {
      this.foundTours = this.tours = data;
      this.initCountryList();
    })
  }

  initCountryList() {
    this.countries = [];
    this.formatedCountries = []
    this.tours.forEach(t => {
      if (!this.countries.includes(t.country)) this.countries.push(t.country);
    });
    this.countries.forEach(c => this.formatedCountries.push({name: c}))
  }

  initPlaceList() {
    this.places = [];
    this.formatedPlaces = []
    this.foundTours.forEach(t => {
      if (!this.places.includes(t.place)) this.places.push(t.place)
    });
    this.places.forEach(c => this.formatedPlaces.push({name: c}))
  }

  onTourSearch(): void {
    if (this.tourSearch.trim()) {
      this.selectedCountries = []
      this.selectedPlaces = []
      this.foundTours = this.foundTours.filter(tour => {
        return tour.title.toLowerCase().includes(this.tourSearch.toLowerCase());
      });
    } else {
      this.foundTours = this.tours
    }
  }

  onCountryFilter() {
    if (this.selectedCountries && this.selectedCountries.length > 0) {

      let sc = [];
      this.selectedCountries.forEach(c => sc.push(c.name));

      this.foundTours = this.tours.filter(tour => sc.includes(tour.country))
      this.isActivePlaces = true;
      this.initPlaceList();
    } else {
      this.selectedCountries = this.selectedPlaces = []
      this.isActivePlaces = false
      this.foundTours = this.tours
      this.initCountryList();
      this.initPlaceList();
    }
    this.tourSearch = ''
  }

  onPlaceFilter(){
    if (this.selectedPlaces && this.selectedPlaces.length > 0) {
      let sp = [];
      this.selectedPlaces.forEach(c => sp.push(c.name));
      this.foundTours = this.tours.filter(tour => sp.includes(tour.place));
    } else {
      this.onCountryFilter()
    }
  }

  onDeleteTour(id){
    this.tourDelete$ = this.tourService.deleteTour(id).subscribe(()=>this.tourService.updateTours())
  }
}
