import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs/operators';
import { CompanyPrice } from 'src/app/models/CompanyPrice';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {

  @Input() companyPrice: CompanyPrice[];
  qty = 0;
  total = 0
  isDisabled = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
  }

  onKey(qty: number) {
    this.qty = +qty;
    this.isDisabled = true;

    if (qty > 0){
      this.isDisabled = false;
    }

    this.total = parseFloat((qty * this.companyPrice[0].last).toFixed(2))
  }

  buy() {

    var portfolio = JSON.parse(localStorage.getItem("portfolio")) || {};

    var totQty = this.qty;
    var totCost = parseFloat((this.companyPrice[0].last * this.qty).toFixed(3));


    if (portfolio[this.companyPrice[0].ticker]){
      console.log(totQty + parseFloat(portfolio[this.companyPrice[0].ticker][0]));
      totQty += parseFloat(portfolio[this.companyPrice[0].ticker][0]);
      totCost = parseFloat((totCost + parseFloat(portfolio[this.companyPrice[0].ticker][1])).toFixed(3));
    }


    portfolio[this.companyPrice[0].ticker] = [totQty, totCost];
    console.log(portfolio);
    localStorage.setItem("portfolio", JSON.stringify(portfolio));

  }

}
