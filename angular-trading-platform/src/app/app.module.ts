import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner'
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InMemDataService } from 'src/app/services/in-memory-data.service';

import { AppComponent } from './app.component';
import { TickerSearchComponent } from './components/ticker-search/ticker-search.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    TickerSearchComponent,
    WatchlistComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatIconModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemDataService, { dataEncapsulation: false, delay: 1000 }),
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTabsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
