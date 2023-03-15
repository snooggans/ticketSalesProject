import {Component, OnInit} from '@angular/core';
import {TourService} from "../../services/tour.service";
import {OrderService} from "../../services/order.service";
import {forkJoin} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  tours
  orders
  activeUser
  isAdmin
  formatedTours
  chartDataPrice
  chartDataCountry
  chartOptions

  constructor(private tourService: TourService,
              private orderService: OrderService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.activeUserData$.subscribe(data => {
      this.activeUser = data;
      forkJoin({
          tours: this.tourService.getAllTours(),
          orders: this.orderService.getAllOrders()
        }
      ).subscribe(data => {
        this.tours = data.tours;
        this.orders = data.orders;
        this.formatTours()
        this.initChart()
      });
    })
  }

  formatTours() {
    const formatedTours = this.tours.map(tour => {

      let formatedTour = tour

      formatedTour.orders = this.orders.filter(order => order.tour._id == tour._id && order.status !== 'canceled')
      return formatedTour

    })
    this.formatedTours = formatedTours.filter(tour => tour.orders.length > 0)
  }

  initChart() {
    this.chartOptions = {
      plugins: {
        legend: {
          display: false
        }
      }
    }

    const chartLabelsTours = this.formatedTours
      .filter(tour => tour.orders.length > 0)
      .map(tour => {
        if (tour.orders.length > 0) return tour.title
      })

    const chartDataTours = this.formatedTours.map(tour => {
      return tour.price * tour.orders.length
    })

    let dataForCountries = {countries: [], orders: []}
    let dataForCountriesRes = {countries: dataForCountries.countries, orders: []}
    this.orders.map(order => {
      if (!dataForCountries.countries.includes(order.tour.country)) {
        dataForCountries.countries.push(order.tour.country);
      }
      dataForCountries.orders.push(order.tour.country)
    })
    for (let i in dataForCountriesRes.countries) {
      let res = dataForCountries.orders.filter(ord => ord == dataForCountriesRes.countries[i])
      dataForCountriesRes.orders.push(res.length)
    }

    this.chartDataPrice = {
      labels: chartLabelsTours.slice(0, 10),
      datasets: [{data: chartDataTours.slice(0, 10)}]
    };

    this.chartDataCountry = {
      labels: dataForCountriesRes.countries.slice(0, 10),
      datasets: [{data: dataForCountriesRes.orders.slice(0, 10)}]
    };
  }

}
