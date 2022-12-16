import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
