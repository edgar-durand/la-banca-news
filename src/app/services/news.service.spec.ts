import {TestBed} from '@angular/core/testing';

import {NewsService} from './news.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

describe('NewsService', () => {
  let service: NewsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });
    service = TestBed.inject(NewsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getNews', () => {
    const spy = spyOn(httpClient, 'get').and.callThrough();
    service.getNews();

    expect(spy).toHaveBeenCalledOnceWith(`${environment.apiUrl}/noticias`);
  });
  it('should call editNews', () => {
    service['_news$'].next([{
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
    }])
    const spy = spyOn(service, 'editNews').and.callThrough();
    service.editNews(1, 'Edited');
    const firstNews = service['_news$'].value[0];


    expect(firstNews.content).toBe('Edited');
    expect(spy).toHaveBeenCalledWith(1, 'Edited');
  });
  it('should call deleteNews', () => {
    const spy = spyOn(service, 'deleteNews').and.callThrough();
    service['_news$'].next([{
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
    }])
    service.deleteNews(1);
    expect(service['_news$'].value.length).toBe(0);
    expect(spy).toHaveBeenCalledOnceWith(1);
  });
});
