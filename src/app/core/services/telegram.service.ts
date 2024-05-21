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

  getUserData() {
    return {
      id: this.tg.initDataUnsafe.user.id,
      first_name: this.tg.initDataUnsafe.user.first_name,
      last_name: this.tg.initDataUnsafe.user.last_name,
      username: this.tg.initDataUnsafe.user.username,
      photo_url: this.tg.initDataUnsafe.user.photo_url,
    };
  }

  getUserId() {
    const id = this.tg.initDataUnsafe.user.id;
    return id;
  }
}
