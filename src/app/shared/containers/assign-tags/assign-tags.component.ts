import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { TagCardComponent } from '@components/tag-card/tag-card.component';
import { ColorPickerComponent } from '@components/color-picker/color-picker.component';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ITag } from '@models/tag.interface';
import { TagsService } from '@services/tags.service';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-assign-tags',
  standalone: true,
  imports: [
    TagCardComponent,
    ColorPickerComponent,
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './assign-tags.component.html',
  styleUrl: './assign-tags.component.css',
})
export class AssignTagsComponent implements OnInit, OnDestroy {
  @Output() assignTags = new EventEmitter();
  @Output() cancel = new EventEmitter();

  tagsService = inject(TagsService);
  _fb = inject(FormBuilder);
  tagForm!: FormGroup;
  subscription = new Subscription();

  isCreateTagClicked = false;
  isChooseColorClicked = false;
  isEditTagClicked = false;

  selectedTags: ITag[] = [];
  tags$!: Observable<ITag[]>;

  tagsLength = 0;

  tagColor: string = '#1E79FF';

  ngOnInit(): void {
    this.subscription = this.tagsService
      .getTags()
      .pipe(
        tap(tags => {
          this.tagsLength = tags.length;
        })
      )
      .subscribe();

    this.tags$ = this.tagsService.getTags();

    this.subscription = this.tagsService.getSelectedTags().subscribe({
      next: tags => {
        this.selectedTags = tags;
      },
    });

    this.tagForm = this._fb.group({
      name: ['', Validators.required],
      color: ['#1E79FF', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack() {
    this.cancel.emit();
  }

  createTag() {
    this.isCreateTagClicked = true;
  }

  toogleChooseColor() {
    this.isChooseColorClicked = !this.isChooseColorClicked;
  }

  chooseColor(color: string) {
    this.tagColor = color;
  }

  selectTag(tag: ITag) {
    this.tagsService.selectTag(tag);
  }

  saveTags() {
    this.assignTags.emit(this.selectedTags);
  }

  tag!: ITag;

  addTag(): void {
    if (this.tagForm.valid) {
      const newTag: ITag = {
        id: this.tagsLength + 1,
        name: this.tagForm.value.name,
        color: this.tagColor,
        checked: false,
      };

      if (this.isEditTagClicked) {
        this.tagsService.updateTag(this.tag.name, newTag);
        this.isEditTagClicked = false;
        this.tagForm.reset({ color: this.tagColor });
        this.isChooseColorClicked = false;
        return;
      } else {
        this.tagsService.addTag(newTag);
        this.tagForm.reset({ color: this.tagColor });
        this.isCreateTagClicked = false;
        this.isChooseColorClicked = false;
      }
    }
  }

  editTag(tag: ITag) {
    this.tag = tag;

    this.tagForm.patchValue({
      name: tag.name,
      color: tag.color,
    });

    this.tagColor = tag.color;
    this.isEditTagClicked = true;
  }

  deleteTag() {
    console.log('delete');
    this.tagsService.deleteTag(this.tag.name);
    this.isEditTagClicked = false;
    this.isChooseColorClicked = false;
  }

  saveEditedTag() {
    const updatedTag: ITag = {
      ...this.tag,
      name: this.tagForm.value.name,
      color: this.tagForm.value.color,
    };

    this.tagsService.editTag(updatedTag);
    this.isEditTagClicked = false;
  }
}
