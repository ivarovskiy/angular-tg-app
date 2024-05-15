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
import { DatePickerComponent } from '@components/date-picker/date-picker.component';

@Component({
  selector: 'app-create-new-task',
  standalone: true,
  imports: [
    InputTextModule,
    DatePickerComponent,
    ReactiveFormsModule,
    ResizeToggleDirective,
    CommonModule,
  ],
  templateUrl: './create-new-task.component.html',
  styleUrl: './create-new-task.component.css',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({ height: '*', opacity: 1, transform: 'translateY(0%)' })
      ),
      state(
        'out',
        style({ height: '0px', opacity: 0, transform: 'translateY(100%)' })
      ),
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
  showDatePicker: boolean = false;

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

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  changeCurrentHight() {
    this.currentHeight = 360;
  }
}
