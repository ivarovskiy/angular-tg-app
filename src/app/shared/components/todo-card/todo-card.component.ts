import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '@models/todo.interface';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export class TodoCardComponent {
  @Input() todo!: ITodo;
  @Input() isCalendarPage?: boolean;
  @Output() toogleTodoStatus = new EventEmitter<number>();

  toggleStatus(): void {
    this.toogleTodoStatus.emit(this.todo.id);
  }
}
