import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '@services/user.service';
import { IUser } from '@models/user.interface';
import { LeaderCardComponent } from '@components/leader-card/leader-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, LeaderCardComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  userService = inject(UserService);
  users: IUser[] = [];

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: data => {
        this.users = [data, data];
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
