import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";

describe('CardComponent', () => {
  const matDialogMock = {}
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatDialogModule, MatIconModule, MatMenuModule, FormsModule],
      providers: [{provide: MatDialog, useValue: matDialogMock}]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render article', () => {
    component.item = {
      id: 1,
      content: 'Test',
      titulo: 'Title',
      fecha: '2020-01-01',
      visible: true,
      imagen_titulo: {
        normal: {
          url: 'https://via.placeholder.com/300x200'
        },
      }
    };
    fixture.detectChanges();
    const article = fixture.nativeElement.querySelector('article');
    const span = fixture.nativeElement.querySelector('span.article-date');
    const div = fixture.nativeElement.querySelector('article > div');
    const img = fixture.nativeElement.querySelector('article > img');
    expect(article).toBeTruthy();
    expect(span).toBeTruthy();
    expect(div).toBeTruthy();
    expect(img).toBeTruthy();
    expect(span.textContent).toBe('2020-01-01');
    expect(div.innerHTML).toBe('Test');
    expect(img.src).toBe('https://via.placeholder.com/300x200');
  });

  it('should emit Delete', () => {
    const spy = spyOn(component.onDelete, 'emit');
    component.handleDelete();
    expect(spy).toHaveBeenCalled();
  });
});
