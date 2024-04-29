import { Component } from '@angular/core';
import { HeaderComponent } from '@layouts/header/header.component';
import { FooterComponent } from '@layouts/footer/footer.component';
import { CalendarComponent } from '@containers/calendar/calendar.component';
import { ChestComponent } from '@components/chest/chest.component';
import { TodoListComponent } from '@containers/todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    ChestComponent,
    TodoListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
