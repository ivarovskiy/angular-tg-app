import { Component, Input } from '@angular/core';
import { IUser } from '@models/user.interface';
import { MissingImageDirective } from '@directives/missing-image.directive';

@Component({
  selector: 'app-leader-card',
  standalone: true,
  imports: [MissingImageDirective],
  templateUrl: './leader-card.component.html',
  styleUrl: './leader-card.component.css',
})
export class LeaderCardComponent {
  @Input() user!: IUser;

  getLeaderLeague() {
    const iconLeague = this.user.currentLeague.toLocaleLowerCase();
    return `/assets/icons/profile/${iconLeague}.svg`;
  }

  getLeaderPoints() {
    if (this.user.tokenBalance > 1000) {
      return `${this.user.tokenBalance / 1000}k points`;
    } else {
      return `${this.user.tokenBalance} points`;
    }
  }
}
