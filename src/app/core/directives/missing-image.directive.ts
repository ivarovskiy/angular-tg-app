import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMissingImage]',
  standalone: true,
})
export class MissingImageDirective {
  @HostListener('error', ['$event'])
  handleError(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src = '/assets/icons/default_avatar.svg';
  }
}
