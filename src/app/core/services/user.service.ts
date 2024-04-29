import { Injectable } from '@angular/core';
import userInfo from '../mock-data/exampleUser.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserInfo(): Observable<any> {
    return of(userInfo.user1);
  }
}
