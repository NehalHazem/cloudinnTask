import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // API
  url = `https://swapi.co/api`;

  constructor(private http: HttpClient) {}

  // get data by searching API using search value pass to it throu form
  getSearch(value) {
    return this.http.get(`${this.url}/${value}`);
  }

}
