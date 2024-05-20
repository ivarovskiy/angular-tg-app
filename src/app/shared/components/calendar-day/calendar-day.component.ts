import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css',
})
export class CalendarDayComponent implements OnInit {
  @Input() date!: Date;
  @Input() isCurrentMonth!: boolean;
  @Input() disabled!: boolean;
  @Input() active!: boolean;
  @Output() handleClick = new EventEmitter();

  now = new Date();
  today = new Date(
    this.now.getFullYear(),
    this.now.getMonth(),
    this.now.getDate()
  ).valueOf();

  isToday = false;

  ngOnInit(): void {
    if (this.date.valueOf() === this.today) {
      this.isToday = true;
    }
  }
  toggleDate() {
    this.handleClick.emit(this.date);
  }
}
