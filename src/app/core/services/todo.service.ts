import { Injectable } from '@angular/core';
import todoList from '../mock-data/exampleTodoList.json';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '@models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private allTodos = new BehaviorSubject<ITodo[]>([]);
  private filteredTodos = new BehaviorSubject<ITodo[]>([]);
  private selectedDate = new BehaviorSubject<Date | null>(null);
  private todosForSelectedDate = new BehaviorSubject<ITodo[]>([]);

  filteredTodos$ = this.todosForSelectedDate.asObservable();

  constructor() {
    this.loadInitialTodos();
  }

  private loadInitialTodos() {
    this.allTodos.next(todoList.todos);
  }

  setTodosForSelectedDate(date: Date): void {
    this.selectedDate.next(date);
    this.updateFilteredTodos();
  }

  private updateFilteredTodos(): void {
    const selectedDateString = this.selectedDate.value!.toDateString();
    const filtered = this.allTodos
      .getValue()
      .filter(
        todo => new Date(todo.time).toDateString() === selectedDateString
      );
    this.todosForSelectedDate.next(filtered);
  }

  toggleTodoStatus(id: number): void {
    const updatedFilteredTodos = this.todosForSelectedDate
      .getValue()
      .map(todo => {
        if (todo.id === id) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      });

    const updatedAllTodos = this.allTodos.getValue().map(todo => {
      const foundTodo = updatedFilteredTodos.find(t => t.id === todo.id);
      return foundTodo ? foundTodo : todo;
    });

    this.todosForSelectedDate.next(updatedFilteredTodos);
    this.allTodos.next(updatedAllTodos);
  }
}
