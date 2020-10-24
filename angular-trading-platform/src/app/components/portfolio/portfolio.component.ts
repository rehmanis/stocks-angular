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

    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || {}

    if (!Object.keys(portfolio).length){
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }else{
      this.portfolioList = Object.keys(JSON.parse(localStorage.getItem("portfolio")));
    }

    console.log(this.portfolioList);
    this.portfolioList.sort();
    console.log(this.portfolioList);
    this.isPortfolioEmpty = (this.portfolioList.length == 0);

    const observables = [
      this.detailService.getMultiCompanyInfo(this.portfolioList, 'price'),
      this.detailService.getMultiCompanyInfo(this.portfolioList, 'detail')
    ];

    forkJoin(
      observables
    ).subscribe((resList) => {

      this.portfolioCompPrice = resList[0].map((item : PriceResponse) => item.results[0]);
      this.portfolioCompDetail = resList[1].map((item : DetailsResponse)=> item.results[0]);
      this.updateDisplayData();
      console.log(this.portfolioCompPrice)
      console.log(this.portfolioCompDetail)
      console.log(this.portfolioData);
      this.isLoading = false;
    });
  }


  updateDisplayData(){

    let portfolio = JSON.parse(localStorage.getItem("portfolio"));
    let qty = 0;
    let avgCost = 0;
    let totalCost = 0;
    let change = 0;

    for (var i = 0; i < this.portfolioCompDetail.length; i++) {

      qty = portfolio[this.portfolioCompDetail[i].ticker][0];
      totalCost = portfolio[this.portfolioCompDetail[i].ticker][1];
      avgCost = totalCost / qty;
      change = avgCost - this.portfolioCompPrice[i].last;

      this.portfolioData.push({
          name: this.portfolioCompDetail[i].name,
          ticker: this.portfolioCompDetail[i].ticker,
          last : this.portfolioCompPrice[i].last,
          qty: qty,
          totalCost: totalCost,
          avgCost: avgCost,
          change: change,
          marketVal: +(this.portfolioCompPrice[i].last * qty).toFixed(3),
          isChangeNeg: change < 0,
          isChangePos: change > 0,
        });
    }


  }

}
