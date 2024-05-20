import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css',
})
export class ColorPickerComponent {
  @Input() choosenColor!: string;
  @Output() handleColor = new EventEmitter();
  colors: string[] = [
    '#1E79FF',
    '#1EAEFF',
    '#6949FF',
    '#EF3DFF',
    '#FF3E3D',
    '#FF9C07',
    '#33D72F',
    '#0ABF7E',
  ];

  clr = '';

  selectColor(color: string) {
    this.clr = color;
    this.handleColor.emit(color);
  }
}
