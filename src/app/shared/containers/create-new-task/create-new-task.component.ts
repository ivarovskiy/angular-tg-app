import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  Renderer2,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DisplayService } from '@services/display.service';
import { Subscription } from 'rxjs';
import { ResizeToggleDirective } from '@directives/resize-toggle.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-new-task',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ResizeToggleDirective,
    CommonModule,
  ],
  templateUrl: './create-new-task.component.html',
  styleUrl: './create-new-task.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: 'fit-content', opacity: 1 })),
      state('out', style({ height: '416px', opacity: 0, display: 'none' })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out')),
    ]),
  ],
})
export class CreateNewTaskComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild('form') formElement!: ElementRef;

  displayService = inject(DisplayService);
  renderer = inject(Renderer2);
  _fb = inject(FormBuilder);

  subscription = new Subscription();
  resizeObserver!: ResizeObserver;

  animationState: string = '';
  currentHeight!: number;
  taskForm!: FormGroup;

  constructor(private elementRef: ElementRef) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.currentHeight = entry.contentRect.height;
      }
    });
  }

  ngOnInit(): void {
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: [''],
    });

    this.subscription = this.displayService.display$.subscribe(display => {
      this.animationState = display;
    });
  }

  ngAfterViewInit(): void {
    if (this.formElement) {
      this.resizeObserver.observe(this.formElement.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.resizeObserver.disconnect();
  }

  saveTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.toggleAnimation();
    }
  }

  toggleAnimation() {
    this.displayService.toggleDisplay();
  }
}
