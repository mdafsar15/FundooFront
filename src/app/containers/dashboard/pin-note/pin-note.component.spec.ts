import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinNoteComponent } from './pin-note.component';

describe('PinNoteComponent', () => {
  let component: PinNoteComponent;
  let fixture: ComponentFixture<PinNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
