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
  watchlist = Object.keys(JSON.parse(localStorage.getItem("watchlist"))) || [];
  watchlistCompDetail: CompanyDetails[] = [];
  watchlistCompPrice: CompanyPrice[] = [];
  watchlistData = []
  isLoading = true;

  constructor(private detailService: DetailsService) { }

  ngOnInit(): void {

    console.log(this.watchlist);
    this.watchlist.sort();
    console.log(this.watchlist);
    this.isWatchListEmpty = (this.watchlist.length == 0);

    const observables = [
      this.detailService.getMultiCompanyInfo(this.watchlist, 'price'),
      this.detailService.getMultiCompanyInfo(this.watchlist, 'detail')
    ];

    forkJoin(
      observables
    ).subscribe((resList) => {

      this.watchlistCompPrice = resList[0].map((item : PriceResponse) => item.results[0]);
      this.watchlistCompDetail = resList[1].map((item : DetailsResponse)=> item.results[0]);
      this.updateDisplayData();
      console.log(this.watchlistCompPrice)
      console.log(this.watchlistData)
      this.isLoading = false;
    })
  }

  updateDisplayData(){

    for (var i = 0; i < this.watchlistCompDetail.length; i++) {

      this.watchlistData.push({
          name: this.watchlistCompDetail[i].name,
          ticker: this.watchlistCompDetail[i].ticker,
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
