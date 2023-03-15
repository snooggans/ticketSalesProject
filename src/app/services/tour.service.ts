import { Injectable } from '@angular/core';
import {ITour} from "../models/tour-model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  tours

  toursSubject = new Subject<any>();
  toursSubject$ = this.toursSubject.asObservable()


  updateTours():void{
    this.getAllTours().subscribe(tours=>{
      this.toursSubject.next(tours)
      this.tours = tours
    })
  }

  getAllTours(): Observable<ITour[]>{
      return this.http.get<ITour[]>('http://localhost:3000/tours/')
  }

  getTourById(id): Observable<ITour>{
    return this.http.get<ITour>('http://localhost:3000/tours/'+id)
  }

  addTour(tourData: any): Observable<any>{
    return this.http.post("http://localhost:3000/tour-item/", tourData)
  }

  editTour(id,tourData: ITour): Observable<any>{
    return this.http.patch("http://localhost:3000/tour-item/" + id, tourData)
  }

  deleteTour(id:string): Observable<any>{
    return this.http.delete("http://localhost:3000/tour-item/" + id)
  }

  getNearestTours(loc): Observable<ITour[]>{
    return this.http.get<ITour[]>("http://localhost:3000/nearest-tours/" + loc)
  }

}
