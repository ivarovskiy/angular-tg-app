import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { CalendarDayComponent } from '@components/calendar-day/calendar-day.component';
import { TodoListComponent } from '@containers/todo-list/todo-list.component';

import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { TodoService } from '@services/todo.service';
import { Observable, Subscription, map } from 'rxjs';
import { ITodo } from '@models/todo.interface';

@Component({
  imports: [
    CommonModule,
    DatePipe,
    AsyncPipe,
    CalendarDayComponent,
    TodoListComponent,
  ],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
})
export class CalendarComponent implements OnInit, OnDestroy {
  todoService = inject(TodoService);
  subscription = new Subscription();

  tasks$: Observable<ITodo[]> = this.todoService.todos$;

  currentMonth: Date = new Date();
  selectDate!: Date;

  daysInMonth: Array<{
    date: Date;
    isCurrentMonth: boolean;
    isDisabled: boolean;
  }> = [];

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // need to localize

  constructor() {}

  ngOnInit(): void {
    this.updateCalendar();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateCalendar() {
    const today = new Date();
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    // First day of the current month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get days of the previous month
    const daysInPreviousMonth = firstDay.getDay();
    const previousMonthDays = [];
    for (let i = daysInPreviousMonth - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      previousMonthDays.push({
        date,
        isCurrentMonth: false,
        isDisabled: this.isPastDate(date, today),
      });
    }

    // Get days of the current month
    const currentMonthDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      currentMonthDays.push({
        date,
        isCurrentMonth: true,
        isDisabled: this.isPastDate(date, today),
      });
    }

    // Calculate the total days displayed in the calendar
    const totalDays = previousMonthDays.length + currentMonthDays.length;
    let daysNeededToFill = 35 - totalDays;

    if (totalDays > 35) {
      daysNeededToFill = 42 - totalDays;
    }

    // Get days of the next month to fill free space days
    const nextMonthDays = [];
    for (let i = 1; i <= daysNeededToFill; i++) {
      const date = new Date(year, month + 1, i);
      nextMonthDays.push({
        date,
        isCurrentMonth: false,
        isDisabled: this.isPastDate(date, today),
      });
    }

    this.daysInMonth = [
      ...previousMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ];

    if (this.isTodayInCurrentMonth(this.currentMonth.getMonth())) {
      this.todoService.setTodosForSelectedDate(today);
    } else {
      this.todoService.setTodosForSelectedDate(firstDay);
    }
  }

  isTodayInCurrentMonth(month: any): boolean {
    const today = new Date();
    return today.getMonth() === month;
  }

  isPastDate(date: Date, today: Date): boolean {
    return date.getTime() < today.setHours(0, 0, 0, 0);
  }

  getTaskCount(date: Date): Observable<number> {
    return this.tasks$.pipe(
      map(
        todos =>
          todos.filter(
            todo => new Date(todo.time).toDateString() === date.toDateString()
          ).length
      )
    );
  }

  getTaskColors(date: Date): Observable<string[]> {
    return this.tasks$.pipe(
      map(
        todos =>
          todos
            .filter(
              todo => new Date(todo.time).toDateString() === date.toDateString()
            )
            .map(todo => (todo.tags?.[0].color ? todo.tags?.[0].color : ''))
            .filter(color => color !== '') // Удаляем пустые строки, если нет цвета
      )
    );
  }

  selectDay(date: Date) {
    this.todoService.setTodosForSelectedDate(date);
    this.selectDate = date;
  }

  prevMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.updateCalendar();
  }
}
