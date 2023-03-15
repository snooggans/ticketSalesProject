import {Component, OnDestroy, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {ActivatedRoute} from "@angular/router";
import {ITour} from "../../models/tour-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent implements OnInit, OnDestroy{

  constructor(private tourService: TourService,
              private route: ActivatedRoute) {
  }

  editTourForm: FormGroup
  tour: ITour = <ITour>{}
  tourID;
  msgsEditTour
  disabled


  ngOnInit() {
    this.initForm()
    this.initTour()
  }

  initTour(){
    this.tourID = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourID).subscribe(tour=>{
      this.tour = tour;
      this.initForm()
    })
  }

  initForm(){
    this.editTourForm = new FormGroup({
      title: new FormControl(this.tour.title, [Validators.required]),
      country: new FormControl(this.tour.country, [Validators.required]),
      place: new FormControl(this.tour.place, [Validators.required]),
      description: new FormControl(this.tour.description, [Validators.required]),
      price: new FormControl(this.tour.price, [Validators.required]),
      tourOperator: new FormControl(this.tour.tourOperator, [Validators.required]),
    })
  }

  addMessagesEditTour(severity, summary, detail) {
    this.msgsEditTour = [
      {severity, summary, detail}
    ];
    this.disabled = true
    setTimeout(() => {
      this.msgsEditTour = [];
      this.disabled = false
    }, 2000)
  }

  onEditTourFormSubmit(): void{
    const tourDataRow = this.editTourForm.getRawValue();
    this.tourService.editTour(this.tourID,tourDataRow).subscribe(
      next=>{
        this.initTour();
        this.addMessagesEditTour('success', 'Тур обновлен', 'Данные тура успешно обновлены');
      },
      error => console.log(error)
    );
    this.initForm();
  }

  ngOnDestroy() {
  }


}
