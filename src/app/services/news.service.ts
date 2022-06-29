import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {INews} from "../interfaces/INews";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news$: BehaviorSubject<INews[]> = new BehaviorSubject<INews[]>([])
  constructor(private http: HttpClient) {
    const savedNews = localStorage.getItem('news');
    if (!savedNews) {
      this.getNews()
        .subscribe((news) => {
          if (news) {
            this.news$.next(news);
            localStorage.setItem('news', JSON.stringify(news));
          }
        })
    } else {
      this.news$.next(JSON.parse(savedNews))
    }
  }

  getNews(): Observable<INews[]> {
    return this.http.get<{ noticias: INews[] }>(`${environment.apiUrl}/noticias`)
      .pipe(map((response) => response.noticias))
  }

  editNews(id: number, content: string) {
    //  TODO: Use Http Service with a PUT or PATCH request method
    const newsIndex = this.news$.value.findIndex((n) => n.id === id);
    if (newsIndex >= 0) {
      let news = this.news$.value.slice();
      news[newsIndex].content = content;
      this.news$.next(news);
      localStorage.setItem('news', JSON.stringify(news));
    }
  }

  deleteNews(id: number) {
    //  TODO: Use Http Service with a DELETE request method
    const newsIndex = this.news$.value.findIndex((n) => n.id === id);
    if (newsIndex >= 0) {
      let news = this.news$.value.slice();
      news.splice(newsIndex, 1);
      this.news$.next(news);
      localStorage.setItem('news', JSON.stringify(news));
    }
  }

}
