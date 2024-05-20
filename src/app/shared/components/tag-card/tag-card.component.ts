import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITag } from '@models/tag.interface';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [],
  templateUrl: './tag-card.component.html',
  styleUrl: './tag-card.component.css',
})
export class TagCardComponent implements OnInit {
  @Input() tag!: ITag;
  @Output() handleEdit = new EventEmitter();
  @Output() handleSelect = new EventEmitter();

  checked: boolean = false;
  ngOnInit(): void {
    this.checked = this.tag.checked;
  }

  toggleTagStatus() {
    this.checked = !this.checked;
    this.selectTag();
  }

  selectTag() {
    this.handleSelect.emit(this.tag);
  }

  editTag() {
    this.handleEdit.emit(this.tag);
  }
}
