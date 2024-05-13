import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-day-card',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './week-day-card.component.html',
  styleUrl: './week-day-card.component.css',
})
export class WeekDayCardComponent {
  @Input() day!: Date;
  @Input() selectedDay!: Date;
  @Output() dayClick = new EventEmitter<Date>();

  isSelected(): boolean {
    return this.day.getDate() === this.selectedDay.getDate();
  }

  onClick(): void {
    this.dayClick.emit(this.day);
  }
}
