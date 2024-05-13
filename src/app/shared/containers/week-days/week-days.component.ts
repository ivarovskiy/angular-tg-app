import { Component, OnInit, inject } from '@angular/core';
import { WeekDayCardComponent } from '@components/week-day-card/week-day-card.component';
import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-week-days',
  standalone: true,
  imports: [WeekDayCardComponent],
  templateUrl: './week-days.component.html',
  styleUrl: './week-days.component.css',
})
export class WeekDaysComponent implements OnInit {
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
