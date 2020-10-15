import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    // let character = this.http.get('https://swapi.co/api/people/1');
    // let characterHomeworld = this.http.get('http://swapi.co/api/planets/1');

    // forkJoin([character, characterHomeworld]).subscribe(results => {
    //   // results[0] is our character
    //   // results[1] is our character homeworld
    //   results[0].homeworld = results[1];
    //   this.loadedCharacter = results[0];


  }

}
