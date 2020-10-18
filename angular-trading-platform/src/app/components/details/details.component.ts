import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { ActivatedRoute } from "@angular/router";
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { CompanyPrice } from 'src/app/models/CompanyPrice';
import * as Highcharts from "highcharts/highstock";
import { DailyChart } from 'src/app/models/DailyChart';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  companyDetails: CompanyDetails[] = [];
  companyPrice: CompanyPrice[];
  dailyChart = [];
  dailyData = [];
  ticker: string;
  isLoading = true;
  isChangePos = false;
  isChangeNeg = false;

  // High charts initialization
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'spline',
        data: [],
        tooltip: {
          valueDecimals: 2
        }
      }
    ],
    rangeSelector:{
      enabled:false
    },
    title: {
      useHTML: true,
    },

  }

  constructor(private detailService: DetailsService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.ticker = params.get("ticker");
    })

    this.detailService.getCompanyDetails(this.ticker).subscribe ( responseList => {

      this.companyDetails = responseList[0].results;
      this.companyPrice = responseList[1].results;

      if (this.companyPrice[0].change < 0) {
        this.isChangeNeg = true;
      }else if (this.companyPrice[0].change > 0) {
        this.isChangePos = true;
      }

      this.companyPrice[0].change = parseFloat(this.companyPrice[0].change.toFixed(2));
      this.companyPrice[0].perChange = parseFloat(this.companyPrice[0].perChange.toFixed(2));

      // console.log(this.companyPrice);
      // console.log(this.companyDetails);


      this.detailService.getDailyChart(this.ticker, this.companyPrice[0].timestamp.slice(0, 10)).subscribe(res => {

        this.dailyChart = res.results;
        this.updateDailyChartData();
        this.isLoading = false;
          
      });

    });


  }


  calculateClassesForPrice() {
    return {
        'positive': this.isChangePos,
        'negative': this.isChangeNeg
    };
  }


  updateDailyChartData() {
    for (var i = 0; i < this.dailyChart.length; i++) {
      this.dailyChart[i] = [new Date(this.dailyChart[i].date).getTime(), this.dailyChart[i].close]
    }

    this.chartOptions.series[0]['data'] = this.dailyChart;
    this.chartOptions.series[0]['name'] = this.ticker.toUpperCase();
    this.chartOptions.title['text'] = '<h2>' + this.ticker.toUpperCase() + '</h2>';

    if (this.isChangeNeg) {
      this.chartOptions.series[0].color = '#ff100d';
    }else if (this.isChangePos){
      this.chartOptions.series[0].color = '#00821a';
    }else{
      this.chartOptions.series[0].color = '#000000';
    }


  }

}
