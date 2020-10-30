import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CompanyDetails, DetailsResponse } from 'src/app/models/CompanyDetails';
import { CompanyPrice, PriceResponse } from 'src/app/models/CompanyPrice';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  isWatchListEmpty = true;
  watchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
  watchlistCompDetail: CompanyDetails[] = [];
  watchlistCompPrice: CompanyPrice[] = [];
  watchlistData = []
  isLoading = true;

  constructor(private detailService: DetailsService) { }

  ngOnInit(): void {

    let watchlistKeys = Object.keys(this.watchlist); 

    watchlistKeys.sort();
    // console.log(watchlistKeys);
    this.isWatchListEmpty = (watchlistKeys.length == 0);

    if (this.isWatchListEmpty){
      return;
    }

    const observables = this.detailService.getMultiCompanyInfo(watchlistKeys, 'price');

    this.detailService.getMultiCompanyInfo(watchlistKeys, 'price').subscribe(res => {

      this.watchlistCompPrice = res.results.map((item : PriceResponse) => item);
      this.updateDisplayData();
      this.isLoading = false;
      // console.log(this.watchlistCompPrice);
    })
  }

  updateDisplayData(){

    for (var i = 0; i < this.watchlistCompPrice.length; i++) {

      this.watchlistData.push({
          name: this.watchlist[this.watchlistCompPrice[i].ticker],
          ticker: this.watchlistCompPrice[i].ticker,
          last : this.watchlistCompPrice[i].last,
          change: this.watchlistCompPrice[i].change,
          perChange: this.watchlistCompPrice[i].perChange,
          isChangeNeg: this.watchlistCompPrice[i].change < 0,
          isChangePos: this.watchlistCompPrice[i].change > 0,
        });
    }
  }

  removeFromWatchList(index, e){

    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    delete watchlist[this.watchlistData[index].ticker];
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    e.stopPropagation();

    // detail 1 element at this index 
    this.watchlistData.splice(index, 1)
    this.isWatchListEmpty = (this.watchlistData.length == 0);

  }


}
