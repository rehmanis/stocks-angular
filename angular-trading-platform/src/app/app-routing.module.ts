import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TickerSearchComponent  } from 'src/app/components/ticker-search/ticker-search.component';
import { WatchlistComponent  } from 'src/app/components/watchlist/watchlist.component';

const routes: Routes = [

  { path: '', component: TickerSearchComponent },
  { path: 'watchlist', component: WatchlistComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
