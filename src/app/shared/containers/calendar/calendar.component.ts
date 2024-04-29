import { Component, OnInit, inject } from '@angular/core';
import { CalendarDayComponent } from '@components/calendar-day/calendar-day.component';
import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarDayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  todoService = inject(TodoService);

  daysOfWeek!: Date[]; //temp data
  selectedDay!: Date;

  ngOnInit(): void {
    this.daysOfWeek = this.createWeekArray();
    this.selectedDay = this.getTodayDate();
    this.todoService.setTodosForSelectedDate(this.selectedDay);
  }

  createWeekArray(): Date[] {
    const today = new Date();
    const days: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }

    return days;
  }

  getTodayDate(): Date {
    const today = new Date();
    return today;
  }

  onDayClick(day: Date): void {
    this.selectedDay = day;
    this.todoService.setTodosForSelectedDate(this.selectedDay);
  }
}
