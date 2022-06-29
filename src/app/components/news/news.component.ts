import {Component} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {INews} from "../../interfaces/INews";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  constructor(public newsService: NewsService) {
  }

  handleEdit(item: INews) {
    this.newsService.editNews(item.id, item.content);
  }

  handleDelete(item: INews) {
    //TODO: Confirm delete
    this.newsService.deleteNews(item.id);
  }
}
