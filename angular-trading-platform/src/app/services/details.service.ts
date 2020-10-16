import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';
import { stringify } from 'querystring';

import { CompanyPrice, PriceResponse } from 'src/app/models/CompanyPrice'
import { CompanyDetails, DetailsResponse} from 'src/app/models/CompanyDetails'

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
          res.results = res.results.map(
            detail => new CompanyDetails(detail.ticker, detail.name, 
                detail.description, detail.startDate, detail.exchangeCode));
        
          return res;
      }));


    let price$ = this.http.get(this.rootURL + '/price/' + ticker)
      .pipe(
        tap( (res: PriceResponse) => {
          res.results = res.results.map(
            price => new CompanyPrice(price.ticker, price.timestamp, price.last, 
              price.prevClose, price.open, price.high, price.low, price.mid, 
              price.volume, price.bidSize, price.bidPrice, price.askSize, price.askPrice));
        
          return res;
      }));

    return forkJoin([detail$, price$]);

  }
  
}
