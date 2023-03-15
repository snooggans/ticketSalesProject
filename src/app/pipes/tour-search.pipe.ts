import { Pipe, PipeTransform } from '@angular/core';
import {ITour} from "../models/tour-model";

@Pipe({
  name: 'tourSearch'
})
export class TourSearchPipe implements PipeTransform {

  transform(tours: ITour[], search: string): ITour[] {
    if(search.trim()) {
      return tours.filter(tour => {
        return tour.title.toLowerCase().includes(search.toLowerCase());
      });
    }else{
      return tours
    }
  }

}
