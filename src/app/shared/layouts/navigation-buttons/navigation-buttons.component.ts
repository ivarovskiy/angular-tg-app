import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DisplayService } from '@services/display.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-buttons.component.html',
  styleUrl: './navigation-buttons.component.css',
})
export class NavigationButtonsComponent implements OnInit {
  displayService = inject(DisplayService);
  router = inject(Router);

  constructor(private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveStatus(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.updateActiveStatus(this.router.url);
  }

  absoluteIconPath = '/assets/icons/navigation';

  buttons = [
    {
      path: '/home',
      icon: `${this.absoluteIconPath}/home.svg`,
      activeIcon: `${this.absoluteIconPath}/home-active.svg`,
      active: false,
    },
    {
      path: '/calendar',
      icon: `${this.absoluteIconPath}/calendar.svg`,
      activeIcon: `${this.absoluteIconPath}/calendar-active.svg`,
      active: false,
    },
    {
      path: 'add',
      icon: `${this.absoluteIconPath}/add.svg`,
      active: false,
      add: true,
    }, // add button
    {
      path: '/leaderboard',
      icon: `${this.absoluteIconPath}/leaderboard.svg`,
      activeIcon: `${this.absoluteIconPath}/leaderboard-active.svg`,
      active: false,
    },
    {
      path: '/features',
      icon: `${this.absoluteIconPath}/features.svg`,
      activeIcon: `${this.absoluteIconPath}/features-active.svg`,
      active: false,
    },
  ];

  navigateTo(path: string): void {
    if (path === 'add') {
      this.showCreateNewTaskComponent();
    } else {
      this.router.navigate([path]);
    }
  }

  updateActiveStatus(url: string): void {
    this.buttons.forEach(button => {
      button.active = url.includes(button.path);
    });
  }

  showCreateNewTaskComponent() {
    this.displayService.toggleDisplay();
  }
}
