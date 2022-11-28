import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutpageComponent } from './checkoutpage.component';

describe('CheckoutpageComponent', () => {
  let component: CheckoutpageComponent;
  let fixture: ComponentFixture<CheckoutpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
