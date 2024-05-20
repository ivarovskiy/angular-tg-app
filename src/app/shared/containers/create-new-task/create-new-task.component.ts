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
import { Subscription, tap } from 'rxjs';
import { ResizeToggleDirective } from '@directives/resize-toggle.directive';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { DatePipe } from '@angular/common';
import { AssignTagsComponent } from '@containers/assign-tags/assign-tags.component';
import { ITag } from '@models/tag.interface';
import { TagsService } from '@services/tags.service';
import { TodoService } from '@services/todo.service';
@Component({
  selector: 'app-create-new-task',
  standalone: true,
  imports: [
    InputTextModule,
    DatePickerComponent,
    AssignTagsComponent,
    ReactiveFormsModule,
    ResizeToggleDirective,
    CommonModule,
    DatePipe,
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
  tagsService = inject(TagsService);
  todoService = inject(TodoService);
  renderer = inject(Renderer2);
  _fb = inject(FormBuilder);

  subscription = new Subscription();
  resizeObserver!: ResizeObserver;

  animationState: string = '';
  currentHeight!: number;
  taskForm!: FormGroup;

  showDatePicker: boolean = false;
  showTagsPicker: boolean = false;

  selectedDate!: Date;
  tags: ITag[] = [];
  selectedTags!: ITag[];
  tagsLength!: number;

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
      time: ['', Validators.required],
      tags: [this.tags],
    });

    this.subscription = this.displayService.display$.subscribe(display => {
      this.animationState = display;
    });

    this.subscription = this.tagsService.selectedTags$.subscribe(tags => {
      this.selectedTags = tags;
    });

    this.subscription = this.tagsService
      .getSelectedTags()
      .pipe(
        tap(tags => {
          this.tagsLength = tags.length;
        })
      )
      .subscribe();
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
      this.todoService.addTodo(this.taskForm.value);
      this.taskForm.reset();
      this.selectedDate = new Date();
      this.selectedTags = [];
      this.tagsLength = 0;
      this.toggleAnimation();

      this.tagsService.resetSelectedTags();
    }
  }

  selectTags(tags: ITag[]) {
    this.taskForm.patchValue({ tags: tags });
    this.toogleTagsPicker();
  }

  toggleAnimation() {
    this.displayService.toggleDisplay();
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  toogleTagsPicker() {
    this.showTagsPicker = !this.showTagsPicker;
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.taskForm.patchValue({ time: date });
    this.toggleDatePicker();
  }

  changeCurrentHight() {
    this.currentHeight = 360;
  }

  removeTag(tag: ITag) {
    this.tagsService.selectTag(tag);
  }
}
