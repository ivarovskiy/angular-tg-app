import { Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from '@components/todo/todo.component';
import { ITodo } from '@models/todo.interface';
import { TodoService } from '@services/todo.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncyPipe } from '@tony-builder/asyncy';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoComponent, AsyncyPipe, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todoService = inject(TodoService);

  todos$!: Observable<ITodo[]>;
  subscription = new Subscription();

  ngOnInit(): void {
    this.todos$ = this.todoService.filteredTodos$;
  }

  handleTodoStatus(id: number): void {
    this.todoService.toggleTodoStatus(id);
  }
}
