import { Injectable } from '@angular/core';
import tags from '../mock-data/exampleTags.json';
import { ITag } from '@models/tag.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private tags = new BehaviorSubject<ITag[]>([]);
  public tags$ = this.tags.asObservable();
  private selectedTags = new BehaviorSubject<ITag[]>([]);
  public selectedTags$ = this.selectedTags.asObservable();

  constructor() {
    this.loadInitialTags();
  }

  private loadInitialTags() {
    // Инициализируем теги с полем checked = false
    const initializedTags = tags.map(tag => ({ ...tag, checked: false }));
    this.tags.next(initializedTags);
  }

  getTags(): Observable<ITag[]> {
    return this.tags$;
  }

  addTag(tag: ITag): void {
    const currentTags = this.tags.getValue();
    this.tags.next([...currentTags, { ...tag, checked: false }]);
  }

  updateTag(oldTag: string, newTag: ITag): void {
    const currentTags = this.tags.getValue();
    const index = currentTags.findIndex(t => t.name === oldTag);
    if (index !== -1) {
      currentTags[index] = { ...newTag, checked: currentTags[index].checked };
      this.tags.next(currentTags);
    }
  }

  deleteTag(tagToDelete: string): void {
    const currentTags = this.tags.getValue();
    const updatedTags = currentTags.filter(tag => tag.name !== tagToDelete);
    this.tags.next(updatedTags);
  }

  selectTag(tag: ITag): void {
    const currentTags = this.tags.getValue();
    const currentSelectedTags = this.selectedTags.getValue();
    const index = currentTags.findIndex(t => t.name === tag.name);

    if (index !== -1) {
      // Обновляем состояние checked тега
      currentTags[index].checked = !currentTags[index].checked;

      // Обновляем список выбранных тегов
      let updatedSelectedTags: ITag[];
      if (currentTags[index].checked) {
        updatedSelectedTags = [...currentSelectedTags, currentTags[index]];
      } else {
        updatedSelectedTags = currentSelectedTags.filter(
          t => t.name !== tag.name
        );
      }

      // Логирование изменений
      console.log('Updated Tags:', currentTags);
      console.log('Updated Selected Tags:', updatedSelectedTags);

      // Обновляем оба списка
      this.tags.next([...currentTags]);
      this.selectedTags.next([...updatedSelectedTags]);
    }
  }

  getSelectedTags(): Observable<ITag[]> {
    return this.selectedTags$;
  }

  resetSelectedTags() {
    const currentTags = this.tags
      .getValue()
      .map(tag => ({ ...tag, checked: false }));
    this.tags.next(currentTags);
    this.selectedTags.next([]);
  }

  editTag(tag: ITag): void {
    const currentTags = this.tags.getValue();
    const index = currentTags.findIndex(t => t.id === tag.id);

    if (index !== -1) {
      console.log('update');

      currentTags[index] = { ...tag, checked: currentTags[index].checked };
      this.tags.next(currentTags);
    }
  }
}
