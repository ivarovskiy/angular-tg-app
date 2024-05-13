import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appResizeToggle]',
  standalone: true,
})
export class ResizeToggleDirective {
  @Input() minHeight: string = '220px'; // Начальная минимальная высота
  @Input() maxHeight: string = '458px'; // Начальная максимальная высота
  private dragging: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Установка плавного перехода сразу при инициализации директивы
    const parentElement = this.el.nativeElement.parentElement;
    this.renderer.setStyle(parentElement, 'transition', 'height 0.3s ease-in');
  }

  @HostListener('mousedown', ['$event']) onMousedown(event: MouseEvent) {
    this.dragging = true; // Начало изменения размера
    const parentElement = this.el.nativeElement.parentElement;
    this.renderer.addClass(parentElement, 'resizing');
  }

  @HostListener('document:mousemove', ['$event']) onMousemove(
    event: MouseEvent
  ) {
    if (this.dragging) {
      const parentElement = this.el.nativeElement.parentElement;
      const movementY = event.movementY;
      const newHeight = movementY < 0 ? this.maxHeight : this.minHeight;

      this.renderer.setStyle(parentElement, 'height', newHeight);
    }
  }

  @HostListener('document:mouseup', ['$event']) onMouseup(event: MouseEvent) {
    this.dragging = false; // Завершение изменения размера
    const parentElement = this.el.nativeElement.parentElement;
    this.renderer.removeClass(parentElement, 'resizing');
  }
}
