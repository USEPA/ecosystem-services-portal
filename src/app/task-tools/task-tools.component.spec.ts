import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskToolsComponent } from './task-tools.component';

describe('ToolsComponent', () => {
  let component: TaskToolsComponent;
  let fixture: ComponentFixture<TaskToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
