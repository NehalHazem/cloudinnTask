import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../searchService/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {

  public myForm: FormGroup;
  public Data: any;
  public dataArr: any;
  public noDataFound: boolean;
  public dragging = null;

  constructor(private service: SearchService, private fb: FormBuilder) { }

  ngOnInit() {
    // Create a form for search value to search with it
    this.myForm = this.fb.group({
      search_value: ['', [Validators.required]]
    });
  }

  onSearch() {
    /* on calling this function send the value inside the input field and get the data returned
    from the API and the assign it to Data variable */
    this.service.getSearch(this.myForm.value.search_value).subscribe(data => {
      this.Data = data;
      // assign the results array inside the Data variable to dataArr variable
      this.dataArr = this.Data.results;
      // When data found assign noDataFound variable to false
      this.noDataFound = false;
    },
    // if their is an error
    () => {
      // assign noDataFound variable to true
      this.noDataFound = true;
    });
  }


  /*
    I included 2 ways for the sorting by drop and drag:
      1- Sortable By UIkit (added the uk-sortable attribute to the container (in HTML)).
      2- By Typescript
  */


  /* By Typescript */

  // Drag Start function get called when dragstart event trigger
  dragStart(e) {
    // asign element being dragged to a variable called dragging
    this.dragging = e.target;
  }


  // Drag Over function get called when dragover event trigger
  dragOver(e) {
    e.preventDefault();
    // Get the size and the position of the element being dragged
    const bounding = e.target.getBoundingClientRect();
    // calculate the bounding
    const offset = bounding.y + (bounding.height / 2);
    // check if the target has class card or not
    if (e.target.classList.contains('card')) {
      // check if the vertical coordinate - calculated bounding is less than 0
      if (e.clientY - offset > 0) {
      // set bottom border to a style
      e.target.style['border-bottom'] = 'solid 5px #fff';
      // set top border style to none
      e.target.style['border-top'] = '';
    } else {
      // set top border to a style
      e.target.style['border-top'] = 'solid 10px #fff';
      // set bottom border style to none
      e.target.style['border-bottom'] = '';
    }
    }
  }


  // Drag Leave function get called when dragleave event trigger
  dragLeave(e) {
  // after releasing the element return border style to none
    e.target.style['border-bottom'] = '';
    e.target.style['border-top'] = '';
  }


  // Drop function get called when drop event trigger
  drop(e) {
    e.preventDefault();
    if (e.target.style['border-bottom'] !== '' ) {
      // return border style to none
      e.target.style['border-bottom'] = '';
      // insert the dragged element after the second element
      e.target.parentNode.insertBefore(this.dragging, e.target.nextSibling);
    } else {
      // check if the target has class card or not
      if (!e.target.classList.contains('card')) {
        // if not return false
        return false;
      } else {
        // if it has, insert the dragged element before the second element
        e.target.parentNode.insertBefore(this.dragging, e.target);
        // return border style to none
        e.target.style['border-top'] = '';
      }
    }
  }


}
