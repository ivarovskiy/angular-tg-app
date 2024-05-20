import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTagsComponent } from './assign-tags.component';

describe('AssignTagsComponent', () => {
  let component: AssignTagsComponent;
  let fixture: ComponentFixture<AssignTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTagsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
