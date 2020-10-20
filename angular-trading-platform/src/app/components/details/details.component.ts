import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { ActivatedRoute } from "@angular/router";
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { CompanyPrice } from 'src/app/models/CompanyPrice';
import * as Highcharts from "highcharts/highstock";
import { DailyChart } from 'src/app/models/DailyChart';
import { tick } from '@angular/core/testing';
import { News } from 'src/app/models/News';
import { HistChart } from 'src/app/models/HistChart';
import Exporting from 'highcharts/modules/exporting';
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from 'highcharts/indicators/volume-by-price';

IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  companyDetails: CompanyDetails[] = [];
  companyPrice: CompanyPrice[];
  companyNews: News[];
  dailyChart = [];
  histChart: HistChart[];
  histData = {
    'volumne': [],
    'ohlc': []
  };
  dailyData = [];
  ticker: string;
  isLoading = true;
  isChangePos = false;
  isChangeNeg = false;
  isError = false;


  // High charts initialization
  HighchartsDaily: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptionsDaily: Highcharts.Options = {
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


  HighchartsHist: typeof Highcharts = Highcharts;
  updateFromInput = false;
  chartOptionsHist: Highcharts.Options = {

    rangeSelector: {
      selected: 2,
    },

    title: {
        text: ''
    },

    subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
    },

    yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
            enabled: true
        }
    }, {
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
    }],

    tooltip: {
        split: true
    },

    plotOptions: {
        series: {
            dataGrouping: {
                units: [[
                  'week',                         // unit name
                  [1]                             // allowed multiples
              ], [
                  'year',
                  [1, 2, 3, 4, 6]
              ]],
      
            }
        }
    },

    series: [{
        type: 'candlestick',
        name: '',
        id: 'candle',
        zIndex: 2,
        data: [
          [0,0,0,0,0],
        ]
    }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: [

          [ 1539907200000, 2278720 ],
     
        ],
        yAxis: 1
    }, {
        type: 'vbp',
        linkedTo: 'candle',
        params: {
            volumeSeriesID: 'volume'
        },
        dataLabels: {
            enabled: false
        },
        zoneLines: {
            enabled: false
        }
    }, {
        type: 'sma',
        linkedTo: 'candle',
        zIndex: 1,
        marker: {
            enabled: false
        }
    }]
  }

  constructor(private detailService: DetailsService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.ticker = params.get("ticker");
    })

    this.detailService.getCompanyDetails(this.ticker).subscribe ( responseList => {

      this.isError = false;
      this.isLoading = true;

      this.companyDetails = responseList[0].results;
      this.companyPrice = responseList[1].results;

      if (this.companyDetails.length == 0 || this.companyPrice.length == 0){
        console.log("Error")
        this.isError = true;
        return;
      }


      if (this.companyPrice[0].change < 0) {
        this.isChangeNeg = true;
      }else if (this.companyPrice[0].change > 0) {
        this.isChangePos = true;
      }

      this.detailService.getDailyChart(this.ticker, this.companyPrice[0].timestamp.slice(0, 10)).subscribe(res => {

        this.dailyChart = res.results;
        this.updateDailyChart();
        this.isLoading = false;
        
      });


      this.detailService.getNewsAndHisChart(this.ticker, this.companyPrice[0].twoYearDateStr).subscribe ( res => {

        this.companyNews = res[0].results;
        // console.log(this.companyNews);
        this.histChart = res[1].results;
        this.updateHistChart();

      });
    });


  }


  calculateClassesForPrice() {
    return {
        'positive': this.isChangePos,
        'negative': this.isChangeNeg
    };
  }


  updateHistChart() {
    for (var i = 0; i < this.histChart.length; i++) {
      this.histData.ohlc.push([
        this.histChart[i].date, this.histChart[i].open, 
        this.histChart[i].high, this.histChart[i].low, this.histChart[i].close
      ]);
      this.histData.volumne.push([this.histChart[i].date, this.histChart[i].volume]);
    }

    this.chartOptionsHist.series[0]['data'] = this.histData.ohlc;
    this.chartOptionsHist.series[1]['data'] = this.histData.volumne;
    this.chartOptionsHist.series[0]['name'] = this.ticker.toUpperCase();

    this.chartOptionsHist.title['text'] = '<h2>' + this.ticker.toUpperCase() + ' Historical</h2>';
    this.updateFromInput = true;
 
  }

  updateDailyChart() {
    for (var i = 0; i < this.dailyChart.length; i++) {
      this.dailyChart[i] = [new Date(this.dailyChart[i].date).getTime(), this.dailyChart[i].close]
    }

    this.chartOptionsDaily.series[0]['data'] = this.dailyChart;
    this.chartOptionsDaily.series[0]['name'] = this.ticker.toUpperCase();
    this.chartOptionsDaily.title['text'] = '<h2>' + this.ticker.toUpperCase() + '</h2>';

    if (this.isChangeNeg) {
      this.chartOptionsDaily.series[0].color = '#ff100d';
    }else if (this.isChangePos){
      this.chartOptionsDaily.series[0].color = '#00821a';
    }else{
      this.chartOptionsDaily.series[0].color = '#000000';
    }


  }

}
