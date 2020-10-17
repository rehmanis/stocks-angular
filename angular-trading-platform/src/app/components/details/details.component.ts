import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { ActivatedRoute } from "@angular/router";
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { CompanyPrice } from 'src/app/models/CompanyPrice';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  companyDetails: CompanyDetails[] = [];
  companyPrice: CompanyPrice[];
  ticker: string;
  isLoading = true;
  isChangePos = false;
  isChangeNeg = false;

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
      this.isLoading = false;

      console.log(this.companyPrice);
      console.log(this.companyDetails);

    });

  }


  calculateClassesForPrice() {
    return {
        'positive': this.isChangePos,
        'negative': this.isChangeNeg
    };
}

}
