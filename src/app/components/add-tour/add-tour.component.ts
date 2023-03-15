import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TourService} from "../../services/tour.service";

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss']
})
export class AddTourComponent implements OnInit {

  addTourForm: FormGroup;
  msgsAddTour
  disabled

  constructor(private tourService: TourService,
  ) {
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.addTourForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      tourOperator: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required])
    })
  }


  addMessagesAddTour(severity, summary, detail) {
    this.msgsAddTour = [
      {severity, summary, detail}
    ];
    this.disabled = true
    setTimeout(() => {
      this.msgsAddTour = [];
      this.disabled = false
    }, 2000)
  }


  onAddTourFormSubmit(): void {
    const tourDataRow = this.addTourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === 'object') {
      for (let prop in tourDataRow) {
        if (prop != 'country' || 'place') {
          formParams.append(prop, tourDataRow[prop])
        } else {
          formParams.append(prop, tourDataRow[prop])
        }
      }
    }
    this.tourService.addTour(formParams).subscribe(
      next => {
        this.tourService.updateTours()
        this.addMessagesAddTour('success', 'Тур одбавлен', '');
      },
      error => console.log(error)
    );
    this.initForm();
  }

  selectFile(ev: any): void {
    if (ev.files.length > 0) {
      this.addTourForm.patchValue({img: ev.files[0]});
    }
  }
}
