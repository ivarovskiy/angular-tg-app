import { Component } from '@angular/core';
import { CalendarComponent } from '@components/calendar/calendar.component';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css',
})
export class DevComponent {}
