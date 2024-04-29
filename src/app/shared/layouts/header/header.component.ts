import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MissingImageDirective } from '@directives/missing-image.directive';
import { ThousandSeparatorPipe } from '@pipes/thousand-separator.pipe';

import { IUser } from '@models/user.interface';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MissingImageDirective, ThousandSeparatorPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userService = inject(UserService);

  user!: IUser;

  // get an user icon
  // get an user fire days
  // get an user tokens

  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.userService.getUserInfo().subscribe({
      next: response => {
        this.user = response;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
