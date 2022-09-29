import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroStageComponent } from './hero-stage.component';

describe('HeroStageComponent', () => {
  let component: HeroStageComponent;
  let fixture: ComponentFixture<HeroStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
