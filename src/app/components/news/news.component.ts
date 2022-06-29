import { Component } from '@angular/core';
import {NewsService} from "../../services/news.service";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  constructor(
    public newsService: NewsService,
    public dialog: MatDialog
  ) { }

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
