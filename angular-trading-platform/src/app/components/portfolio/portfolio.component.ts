import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CompanyDetails, DetailsResponse } from 'src/app/models/CompanyDetails';
import { CompanyPrice, PriceResponse } from 'src/app/models/CompanyPrice';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  isLoading = true;
  isPortfolioEmpty = true;
  portfolioList = []
  portfolioData = []
  portfolioCompPrice: CompanyPrice[] = [];
  portfolioCompDetail: CompanyDetails[] = [];


  constructor(private detailService: DetailsService) { }

  ngOnInit(): void {

    this.updateData(-1);
  }

  updateData(index: number){

    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || {}

    if (!Object.keys(portfolio).length){
      console.log("portfolio empty")
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
      this.portfolioList = [];
    }else{
      this.portfolioList = Object.keys(JSON.parse(localStorage.getItem("portfolio")));
    }

    // console.log(this.portfolioList);
    this.portfolioList.sort();
    // console.log(this.portfolioList);
    this.isPortfolioEmpty = (this.portfolioList.length == 0);

    const observables = [
      this.detailService.getMultiCompanyInfo(this.portfolioList, 'price'),
      this.detailService.getMultiCompanyInfo(this.portfolioList, 'detail')
    ];

    forkJoin(
      observables
    ).subscribe((resList) => {

      this.portfolioCompPrice = resList[0].map((item : PriceResponse) => item.results[0]);
      this.portfolioCompDetail = resList[1].map((item : DetailsResponse) => item.results[0]);
      this.updateDisplay(index);

      // console.log(this.portfolioData);
      // console.log(this.portfolioCompPrice);
      this.isLoading = false;
    });
    console.log("got the buy")
  }


  updateDisplay(index: number){

    let portfolio = JSON.parse(localStorage.getItem("portfolio"));
    let qty = 0;
    let avgCost = 0;
    let totalCost = 0;
    let change = 0;

    // console.log("my index is " + index);
    // console.log(this.portfolioCompDetail);
    // console.log(this.portfolioCompPrice);    

    if (index != -1){
      this.portfolioData.splice(index, 1);
      console.log("after")
      console.log(this.portfolioCompDetail);
      console.log(this.portfolioCompPrice);
      
    }

    for (var i = 0; i < this.portfolioCompDetail.length; i++) {

      qty = portfolio[this.portfolioCompDetail[i].ticker][0];
      totalCost = portfolio[this.portfolioCompDetail[i].ticker][1];
      avgCost = totalCost / qty;
      change = +(avgCost - this.portfolioCompPrice[i].last).toFixed(3);

      // console.log(this.portfolioData)
      // console.log(this.portfolioData)

      if (this.portfolioData.length == this.portfolioCompDetail.length){
        this.portfolioData[i].last = this.portfolioCompPrice[i].last;
        this.portfolioData[i].qty = qty;
        this.portfolioData[i].totalCost = totalCost;
        this.portfolioData[i].avgCost = +avgCost.toFixed(3);
        this.portfolioData[i].change = change;  
        this.portfolioData[i].marketVal = +(this.portfolioCompPrice[i].last * qty).toFixed(3);
        this.portfolioData[i].isChangeNeg = change < 0;
        this.portfolioData[i].isChangePos = change > 0;
      }else{

        this.portfolioData.push({
          name: this.portfolioCompDetail[i].name,
          ticker: this.portfolioCompDetail[i].ticker,
          last : this.portfolioCompPrice[i].last,
          qty: qty,
          totalCost: totalCost,
          avgCost: +avgCost.toFixed(3),
          change: change,
          marketVal: +(this.portfolioCompPrice[i].last * qty).toFixed(3),
          isChangeNeg: change < 0,
          isChangePos: change > 0,
        });

      }

    }


  }

}
