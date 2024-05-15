import { Component } from '@angular/core';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css',
})
export class DevComponent {}
