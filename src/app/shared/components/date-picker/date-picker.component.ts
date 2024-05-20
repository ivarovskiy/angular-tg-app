import { Component, EventEmitter, Output } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent {
  @Output() handleSave = new EventEmitter();

  date: Date = new Date();
  todayDate: Date = new Date();

  saveCalendar() {
    this.handleSave.emit(this.date);
  }
}
