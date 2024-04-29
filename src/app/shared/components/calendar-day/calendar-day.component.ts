import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css',
})
export class CalendarDayComponent {
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
