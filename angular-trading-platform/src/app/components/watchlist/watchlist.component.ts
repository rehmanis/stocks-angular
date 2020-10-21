import { Component, OnInit } from '@angular/core';
import { CompanyDetails} from 'src/app/models/CompanyDetails';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  isWatchListEmpty = true;
  watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlistDetails: CompanyDetails[];

  constructor(private detailService: DetailsService) { }

  ngOnInit(): void {
    this.detailService.getMultiCompanyDetails(this.watchlist).subscribe (responseList => {

      for (let i = 0; i < responseList.length; i++){
        this.watchlistDetails.push(responseList[i].results)
      }

    });

  }

}
