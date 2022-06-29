import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditDialogComponent} from './edit-dialog.component';
import {DebugElement} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {By} from "@angular/platform-browser";

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [EditDialogComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {content: 'test'}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const h2 = de.query(By.css('h2'));
    expect(h2.nativeElement.innerText).toBe('Editar noticia');
  });
});
