import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@models/user.interface';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';
import { MissingImageDirective } from '@directives/missing-image.directive';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MissingImageDirective, DividerModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  router = inject(Router);
  userService = inject(UserService);

  subscription = new Subscription();
  user!: IUser;
  //get an image and statistic

  goBack() {
    this.router.navigate(['']);
  }

  invite() {
    console.log('invite');
  }

  // get an user icon
  // get an user fire days
  // get an user tokens

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

  getLeagueIcon() {
    const iconLeague = this.user.currentLeague.toLowerCase();
    return `/assets/icons/profile/${iconLeague}-league.svg`;
  }

  nextAchievement() {
    console.log('next ach');
  }
}
