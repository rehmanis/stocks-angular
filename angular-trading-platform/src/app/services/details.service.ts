import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';
import { stringify } from 'querystring';

import { CompanyPrice, PriceResponse } from 'src/app/models/CompanyPrice'
import { CompanyDetails, DetailsResponse} from 'src/app/models/CompanyDetails'
import { DailyChart, DailyChartResponse } from '../models/DailyChart';
import { News, NewsResponse } from '../models/News';
import { HistChart, HistChartResponse } from '../models/HistChart';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private rootURL = '/api';

  constructor(private http: HttpClient) {}

  public getCompanyDetails(ticker: string): Observable<any[]> {

    let detail$ = this.http.get(this.rootURL + '/detail/' + ticker)
      .pipe(
        tap( (res: DetailsResponse) => {

          // console.log(res);

          if (!res.success) {
            res.results = [];
            // console.log("errror detail");
            return res;
          }


          res.results = res.results.map(
            detail => new CompanyDetails(detail.ticker, detail.name, 
                detail.description, detail.startDate, detail.exchangeCode));
        
          return res;
      }));


    let price$ = this.http.get(this.rootURL + '/price/' + ticker)
      .pipe(
        tap( (res: PriceResponse) => {

          // console.log(res.results);

          if (!res.success) {
            res.results = [];
            // console.log("errror price");
            return res;
          }


          res.results = res.results.map(
            price => new CompanyPrice(price.ticker, price.timestamp, price.last, 
              price.prevClose, price.open, price.high, price.low, price.mid, 
              price.volume, price.bidSize, price.bidPrice, price.askSize, price.askPrice));
        
          return res;
      }));

    return forkJoin([detail$, price$]);

  }

  public getDailyChart(ticker: string, startDate: string): Observable<DailyChartResponse> {

    return this.http.get<DailyChartResponse>(this.rootURL + '/chart/daily/' + ticker + '/' + startDate)
    
    .pipe(
      tap( (res: DailyChartResponse) => {
        res.results = res.results.map(
          chartData => new DailyChart(chartData.date, chartData.close));

        return res;
    }));  
  }


  public getNewsAndHisChart(ticker: string, startDate: string): Observable<any[]> {

    let news$ = this.http.get<NewsResponse>(this.rootURL + '/news/' + ticker)
      .pipe(
        tap( (res: NewsResponse) => {
          res.results = res.results.map(
            news => new News(news.url, news.title, news.description, news.source, 
              news.urlToImage, news.publishedAt));
        
          return res;
      }));


    let hist$ = this.http.get(this.rootURL + '/chart/historical/' + ticker + '/' + startDate)
      .pipe(
        tap( (res: HistChartResponse) => {
          res.results = res.results.map(
            data => new HistChart(data.date, data.open, data.high, data.low, data.close, data.volume));
        
          return res;
      }));

    return forkJoin([news$, hist$]);

  }

  
}
