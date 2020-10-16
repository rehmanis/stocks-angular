import { Component, OnInit } from '@angular/core';
import {DetailsService} from 'src/app/services/details.service';
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

  constructor(private detailService: DetailsService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.ticker = params.get("ticker");
    })

    this.detailService.getCompanyDetails(this.ticker).subscribe ( responseList => {

      this.companyDetails = responseList[0].results;
      this.companyPrice = responseList[1].results;
      this.isLoading = false;

      console.log(this.companyPrice);
      console.log(this.companyDetails);

    });


  }

}
