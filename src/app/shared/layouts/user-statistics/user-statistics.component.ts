import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MissingImageDirective } from '@directives/missing-image.directive';
import { ThousandSeparatorPipe } from '@pipes/thousand-separator.pipe';

import { IUser } from '@models/user.interface';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-statistics',
  standalone: true,
  imports: [MissingImageDirective, ThousandSeparatorPipe],
  templateUrl: './user-statistics.component.html',
  styleUrl: './user-statistics.component.css',
})
export class UserStatisticsComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  router = inject(Router);

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

  openProfile() {
    console.log('open profile');
    this.router.navigate(['/user-profile']);
  }
}
