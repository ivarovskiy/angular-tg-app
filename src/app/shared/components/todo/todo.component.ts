import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '@models/todo.interface';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo!: ITodo;
  @Output() toogleTodoStatus = new EventEmitter<number>();

  toggleStatus(): void {
    this.toogleTodoStatus.emit(this.todo.id);
  }
}
