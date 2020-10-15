import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) {}

  // getCompDetails(ticker): Observable {
  //   return this.http.get<InSearchResponse>('/api/search/' + ticker)
  //   .pipe(
  //     tap((response: InSearchResponse) => {
  //       response.results = response.results
  //         .map(company => new CompanySearchResult(company.ticker, company.name))

  //       return response;
  //     }));
  // }

  
}
