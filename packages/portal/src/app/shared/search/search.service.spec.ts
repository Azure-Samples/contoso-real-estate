import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe('SearchService', () => {
  let service: SearchService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()],
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(SearchService);
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
  });
});
