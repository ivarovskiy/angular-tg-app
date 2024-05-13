import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationButtonsComponent } from '@layouts/navigation-buttons/navigation-buttons.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = $localize`angular-tg-app`;
}
