import { Component } from '@angular/core';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { TodoCardComponent } from '@components/todo-card/todo-card.component';
import { TodoListComponent } from '@containers/todo-list/todo-list.component';
import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePickerComponent, TodoListComponent, TodoCardComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  constructor() {}
}
