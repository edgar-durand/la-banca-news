import {Injectable} from '@angular/core';
import {CustomHttpService} from "./custom-http.service";
import {BehaviorSubject} from "rxjs";
import {INews} from "../interfaces/INews";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news$: BehaviorSubject<INews[]> = new BehaviorSubject<INews[]>([])
  constructor(private httpService: CustomHttpService) {}

  refreshNews() {
    this.httpService.get<{ noticias: INews[] }>(`${environment.apiUrl}/noticias`)
      .then((news) => {
        if (news?.noticias) {
          this.news$.next(<INews[]>news?.noticias)
          localStorage.setItem('news', JSON.stringify(news?.noticias));
        }
      })
      .catch(console.error)
  }

  editNews(id: number, content: string){
    //  TODO: Use Http Service with a PUT or PATCH request method
    const newsIndex = this.news$.value.findIndex((n) => n.id === id);
    if (newsIndex >= 0) {
      let news = this.news$.value.slice();
      news[newsIndex].content = content;
      this.news$.next(news);
      localStorage.setItem('news', JSON.stringify(news));
    }
  }

  deleteNews(id: number){
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
