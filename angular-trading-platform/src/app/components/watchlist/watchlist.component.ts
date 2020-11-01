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

    // let watchlistKeys = Object.keys(this.watchlist); 

    // watchlistKeys.sort();
    // console.log(watchlistKeys);


    this.updateData();

    // const observables = this.detailService.getMultiCompanyInfo(watchlistKeys, 'price');

    // this.detailService.getMultiCompanyInfo(watchlistKeys, 'price').subscribe(res => {

    //   this.watchlistCompPrice = res.results.map((item : PriceResponse) => item);
    //   this.updateDisplayData();
    //   this.isLoading = false;
    //   // console.log(this.watchlistCompPrice);
    // })
  }

  updateData(){

    this.watchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
    let watchlistKeys = Object.keys(this.watchlist); 
    const observables = this.detailService.getMultiCompanyInfo(watchlistKeys, 'price');

    this.isWatchListEmpty = (watchlistKeys.length == 0);
    // console.log(this.isWatchListEmpty);
    // console.log(this.watchlist);
    // console.log(this.watchlistData);

    if (this.isWatchListEmpty){
      return;
    }

    this.detailService.getMultiCompanyInfo(watchlistKeys, 'price').subscribe(res => {

      this.watchlistCompPrice = res.results.map((item : PriceResponse) => item);
      this.updateDisplayData();
      this.isLoading = false;
      // console.log(this.watchlistCompPrice);
    })

  }

  updateDisplayData(){

    for (var i = 0; i < this.watchlistCompPrice.length; i++) {

      if (this.watchlistData.length == this.watchlistCompPrice.length){
        this.watchlistData[i].last = this.watchlist[this.watchlistCompPrice[i].ticker];
        this.watchlistData[i].name = this.watchlist[this.watchlistCompPrice[i].ticker];
        this.watchlistData[i].ticker = this.watchlistCompPrice[i].ticker;
        this.watchlistData[i].last = this.watchlistCompPrice[i].last;
        this.watchlistData[i].change = this.watchlistCompPrice[i].change;
        this.watchlistData[i].perChange = this.watchlistCompPrice[i].perChange;
        this.watchlistData[i].isChangeNeg = this.watchlistCompPrice[i].change < 0;
        this.watchlistData[i].isChangePos = this.watchlistCompPrice[i].change > 0;

      }else{
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
  }

  removeFromWatchList(index, e){

    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    delete watchlist[this.watchlistData[index].ticker];
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    // console.log("before e prop");
    e.stopPropagation();
    // console.log("after e prop");

    // detail 1 element at this index 
    this.watchlistData.splice(index, 1)
    // this.isWatchListEmpty = (this.watchlistData.length == 0);

    this.updateData();
  }


}
