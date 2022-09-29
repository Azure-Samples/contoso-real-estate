import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextpageComponent } from './textpage.component';

describe('TextpageComponent', () => {
  let component: TextpageComponent;
  let fixture: ComponentFixture<TextpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
