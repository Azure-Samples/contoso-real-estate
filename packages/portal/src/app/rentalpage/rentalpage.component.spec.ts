import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalpageComponent } from './rentalpage.component';

describe('RentalpageComponent', () => {
  let component: RentalpageComponent;
  let fixture: ComponentFixture<RentalpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
