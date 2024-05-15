import { Component } from '@angular/core';
import { UserStatisticsComponent } from '@layouts/user-statistics/user-statistics.component';
import { NavigationButtonsComponent } from '@layouts/navigation-buttons/navigation-buttons.component';
import { WeekDaysComponent } from '@containers/week-days/week-days.component';
import { RewardCardComponent } from '@components/reward-card/reward-card.component';
import { TodoListComponent } from '@containers/todo-list/todo-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserStatisticsComponent,
    NavigationButtonsComponent,
    WeekDaysComponent,
    RewardCardComponent,
    TodoListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
