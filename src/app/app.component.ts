import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationButtonsComponent } from '@layouts/navigation-buttons/navigation-buttons.component';
import { CreateNewTaskComponent } from '@containers/create-new-task/create-new-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationButtonsComponent, CreateNewTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = $localize`angular-tg-app`;
}
