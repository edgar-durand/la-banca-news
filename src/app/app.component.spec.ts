import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NewsComponent} from "./components/news/news.component";
import {NewsService} from "./services/news.service";
import {NewsServiceMock} from "./services/news.service.mock";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NewsComponent,
      ],
      providers: [
        {provide: NewsService, useClass: NewsServiceMock},
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
