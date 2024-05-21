import { Injectable, inject, isDevMode } from '@angular/core';
import todoList from '../mock-data/exampleTodoList.json';
import { BehaviorSubject, Observable, iif, of } from 'rxjs';
import { ITodo } from '@models/todo.interface';
import { ApiService } from './http/api.service';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiService = inject(ApiService);
  tgService = inject(TelegramService);

  private allTodos = new BehaviorSubject<ITodo[]>([]);
  private filteredTodos = new BehaviorSubject<ITodo[]>([]);
  private selectedDate = new BehaviorSubject<Date | null>(null);
  private todosForSelectedDate = new BehaviorSubject<ITodo[]>([]);

  todos$ = this.allTodos.asObservable();
  filteredTodos$ = this.todosForSelectedDate.asObservable();

  constructor() {
    this.loadInitialTodos();
  }

  private loadInitialTodos() {
    const userId = this.tgService.getUserId();

    this.apiService.getTodos(userId).subscribe({
      next: todos => {
        this.allTodos.next(todos);
        this.updateFilteredTodos();
      },
      error: () => {
        this.allTodos.next(todoList.todos);
        this.updateFilteredTodos();
      },
    });
  }

  getTodos(): Observable<ITodo[]> {
    return this.todos$;
  }

  addTodo(todo: ITodo): void {
    const currentTodos = this.allTodos.getValue();
    const newTodo = { ...todo, id: currentTodos.length + 1, status: false };
    this.allTodos.next([...currentTodos, newTodo]);

    const userId = this.tgService.getUserId();

    this.apiService.addTodo(userId, newTodo); // этот запрос не работает
    this.updateFilteredTodos();
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

  getTodosCount() {
    return this.todosForSelectedDate.getValue().length;
  }
}
