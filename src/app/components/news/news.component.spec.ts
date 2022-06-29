import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {DebugElement} from "@angular/core";
import {NewsService} from "../../services/news.service";
import {NewsServiceMock} from "../../services/news.service.mock";
import {By} from "@angular/platform-browser";
import {CardComponent} from "../card/card.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let de: DebugElement;
  let newsService: NewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
      ],
      declarations: [NewsComponent, CardComponent],
      providers: [
        {provide: NewsService, useClass: NewsServiceMock},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    newsService = TestBed.inject(NewsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const title = de.nativeElement.querySelector('h2');
    const subTitle = de.nativeElement.querySelector('span');
    expect(title.textContent).toBe('Archivo de noticias');
    expect(subTitle.textContent).toBe('Institucional');
  });
  it('should not render cards whether there are not news', () => {
    const cards = de.queryAll(By.directive(CardComponent));
    expect(cards.length).toBe(0);
  });
  it('should render cards', () => {
    const oneNews: any = {
      id: 1,
      content: 'Test',
      titulo: 'Title',
      fecha: '2020-01-01',
      visible: true,
      imagen_titulo: {
        normal: {
          url: 'https://via.placeholder.com/300x200'
        }
      }
    };

    newsService['_news$'].next([oneNews]);
    fixture.detectChanges();
    const cards = de.queryAll(By.directive(CardComponent));
    expect(cards.length).toBe(1);
  });

  it('should delete one news', () => {
    const oneNews: any = {
      id: 1,
      content: 'Test',
      titulo: 'Title',
      fecha: '2020-01-01',
      visible: true,
      imagen_titulo: {
        normal: {
          url: 'https://via.placeholder.com/300x200'
        }
      }
    };

    const spy = spyOn(newsService, 'deleteNews').and.callThrough();
    newsService['_news$'].next([oneNews]);
    fixture.detectChanges();

    component.handleDelete(oneNews);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should edit one news', () => {
    const oneNews: any = {
      id: 1,
      content: 'Test',
      titulo: 'Title',
      fecha: '2020-01-01',
      visible: true,
      imagen_titulo: {
        normal: {
          url: 'https://via.placeholder.com/300x200'
        }
      }
    };
    newsService['_news$'].next([oneNews]);
    const spy = spyOn(newsService, 'editNews').and.callThrough();
    oneNews.content = 'Test2';
    component.handleEdit(oneNews);
    fixture.detectChanges();

    expect(newsService['_news$'].value[0].content).toBe('Test2');
    expect(spy).toHaveBeenCalledWith(oneNews.id, oneNews.content);
  });

  it('should get news', () => {
    const spy = spyOn(newsService, 'getNews').and.callThrough();
    newsService.getNews();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
