import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/news.service";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {INews} from "../../interfaces/INews";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(
    public newsService: NewsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const savedNews = localStorage.getItem('news');
    if (savedNews) {
      this.newsService.news$.next(<INews[]>JSON.parse(savedNews))
    } else {
      this.newsService.refreshNews();
    }
  }

  handleEdit(id: number, content: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newsService.editNews(id, dialogRef.componentInstance.content);
      }
    });
  }

  handleDelete(id: number){
    //TODO: Confirm delete
    this.newsService.deleteNews(id);
  }


}
