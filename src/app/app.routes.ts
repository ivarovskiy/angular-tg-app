import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
  {
    path: 'features',
    loadComponent: () =>
      import('./pages/features/features.component').then(
        c => c.FeaturesComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
