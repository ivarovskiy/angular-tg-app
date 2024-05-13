import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayCardComponent } from './week-day-card.component';

describe('WeekDayCardComponent', () => {
  let component: WeekDayCardComponent;
  let fixture: ComponentFixture<WeekDayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDayCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekDayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
