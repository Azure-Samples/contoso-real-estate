import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchpageComponent } from './searchpage.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe('SearchpageComponent', () => {
  let component: SearchpageComponent;
  let fixture: ComponentFixture<SearchpageComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations()],
      imports: [ApolloTestingModule, SearchpageComponent],
    })
    .compileComponents();
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should initialize searchForm with empty term control', () => {
    expect(component.searchForm.get('term')?.value).toEqual('');
  });

  it('should mark searchForm as invalid when term control is less than 4 characters long', () => {
    component.searchForm.setValue({ term: 'abc' });
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should mark searchForm as invalid when term control is longer than 50 characters', () => {
    const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae dui ultricies, pretium orci at, viverra justo.';
    component.searchForm.setValue({ term: longString });
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should mark searchForm as invalid when term control contains invalid characters', () => {
    component.searchForm.setValue({ term: 'abc@123' });
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should mark searchTermInvalid as true when submitting invalid form', () => {
    component.onSubmit();
    expect(component.seatrchTermInvalid).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
  });
});

