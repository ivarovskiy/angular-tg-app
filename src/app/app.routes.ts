import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevComponent } from './pages/dev/dev.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dev', component: DevComponent },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./pages/user-profile/user-profile.component').then(
        c => c.UserProfileComponent
      ),
  },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./pages/leaderboard/leaderboard.component').then(
        c => c.LeaderboardComponent
      ),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./pages/calendar/calendar.component').then(
        c => c.CalendarComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
