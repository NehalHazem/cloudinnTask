import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ SearchPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Search Page Component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form', () => {
    expect(component.myForm.contains('search_value')).toBeTruthy();
  });

  it('should make search_value required', () => {
    const control = component.myForm.get('search_value');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should have onSearch function', () => {
    expect(component.onSearch).toBeTruthy();
  });

  it('onSearch function should not return an empty array', () => {
    const array: any = [];
    expect(component.onSearch()).not.toEqual(array);
  });

  it('should have dragStart function', () => {
    expect(component.dragStart).toBeTruthy();
  });

  it('should have dragOver function', () => {
    expect(component.dragOver).toBeTruthy();
  });

  it('should have dragLeave function', () => {
    expect(component.dragLeave).toBeTruthy();
  });

  it('should have drop function', () => {
    expect(component.drop).toBeTruthy();
  });

});
