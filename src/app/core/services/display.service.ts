import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private display = new BehaviorSubject<string>('out');
  display$ = this.display.asObservable();

  constructor() {}

  toggleDisplay() {
    console.log(this.display.getValue());

    this.display.next(this.display.getValue() === 'out' ? 'in' : 'out');
  }
}
