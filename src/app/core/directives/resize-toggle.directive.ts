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
  @Input() minHeight: string = '156px'; // Начальная минимальная высота
  @Input() maxHeight: string = '400px'; // Начальная максимальная высота
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
    this.startDrag();
  }

  @HostListener('document:mousemove', ['$event']) onMousemove(
    event: MouseEvent
  ) {
    this.onDrag(event.movementY);
  }

  @HostListener('document:mouseup', ['$event']) onMouseup(event: MouseEvent) {
    this.endDrag();
  }

  @HostListener('touchstart', ['$event']) onTouchstart(event: TouchEvent) {
    this.startDrag();
  }

  @HostListener('document:touchmove', ['$event']) onTouchmove(
    event: TouchEvent
  ) {
    if (this.dragging) {
      const touch = event.touches[0];
      this.onDrag(
        touch.clientY - this.el.nativeElement.getBoundingClientRect().top
      );
    }
  }

  @HostListener('document:touchend', ['$event']) onTouchend(event: TouchEvent) {
    this.endDrag();
  }

  private startDrag() {
    this.dragging = true; // Начало изменения размера
    const parentElement = this.el.nativeElement.parentElement;
    this.renderer.addClass(parentElement, 'resizing');
  }

  private onDrag(movementY: number) {
    if (this.dragging) {
      const parentElement = this.el.nativeElement.parentElement;
      const newHeight = movementY < 0 ? this.maxHeight : this.minHeight;

      this.renderer.setStyle(parentElement, 'height', newHeight);
    }
  }

  private endDrag() {
    this.dragging = false; // Завершение изменения размера
    const parentElement = this.el.nativeElement.parentElement;
    this.renderer.removeClass(parentElement, 'resizing');
  }
}
