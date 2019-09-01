import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { SearchService } from './search.service';
import { ArrayType } from '@angular/compiler';

describe('SearchService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
  });

  it('should create the Search Service', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should have get function', inject([SearchService], (service: SearchService) => {
    expect(service.getSearch).toBeTruthy();
  }));

  it('get function should not return an empty array', inject([SearchService], (service: SearchService) => {
    const array: any = [];
    expect(service.getSearch('people')).not.toEqual(array);
  }));

});
