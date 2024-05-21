import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@models/user.interface';
import { ITodo } from '@models/todo.interface';
import { ILeaderboard } from '@models/leaderboard.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`/get_user/${id}`);
  }

  addUser(user: IUser): Observable<IUser> {
    const {
      id,
      name,
      friends,
      invitation,
      achievements,
      currentLeague,
      taskCompleted,
      burningDays,
      tokenBalance,
    } = user;
    return this.http.post<IUser>(
      `/add_user/${id}/${name}/${friends}/${invitation}/${achievements}/${currentLeague}/${taskCompleted}/${burningDays}/${tokenBalance}`,
      {}
    );
  }

  // ToDo Endpoints
  getTodos(userId: number): Observable<any> {
    return this.http.get(`/get_todos/${userId}`);
  }

  getTodosByCalendar(time: string): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`/get_todos_calendar/${time}`);
  }

  addTodo(userId: number, todo: ITodo): void {
    const { id, time, duration, status, title, description, tags } = todo;
    this.http.post<ITodo>(
      `/add_task/${userId}/${time}/${duration}/${status}/${title}/${description}/${tags}`,
      {}
    );
  }

  updateTodoBadges(
    userId: number,
    id: number,
    badges: string[]
  ): Observable<{ badges: string[] }> {
    return this.http.post<{ badges: string[] }>(
      `/update_badges/${userId}/${id}/${JSON.stringify(badges)}`,
      {}
    );
  }

  completeTodo(userId: number, id: number): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(
      `/complete_todo/${userId}/${id}`,
      {}
    );
  }

  // Leaderboard Endpoints
  getLeaderboard(
    period: string,
    numberOfUsers: number
  ): Observable<ILeaderboard[]> {
    return this.http.get<ILeaderboard[]>(
      `/get_leaderboard/${period}/${numberOfUsers}`
    );
  }

  // Balance Endpoints
  updateBalance(
    userId: number,
    balance: number
  ): Observable<{
    tokenBalance: number;
    weekly: number;
    monthly: number;
    all_time: number;
  }> {
    return this.http.post<{
      tokenBalance: number;
      weekly: number;
      monthly: number;
      all_time: number;
    }>(`/update_balance/${userId}/${balance}`, {});
  }

  // Reference Link Endpoint
  getRefLink(id: number): Observable<{ link: string }> {
    return this.http.get<{ link: string }>(`/get_ref_link/${id}`);
  }
}
