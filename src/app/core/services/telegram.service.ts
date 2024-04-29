import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private _document = inject(DOCUMENT);

  private window!: any;
  private tg!: any;

  constructor() {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
  }
}
