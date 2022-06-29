import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {INews} from "../../interfaces/INews";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() item!: INews;
  @Input() isEven!: boolean;
  @Output() onEdit: EventEmitter<INews> = new EventEmitter<INews>();
  @Output() onDelete: EventEmitter<INews> = new EventEmitter<INews>();
  private destroyed$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
  }

  handleEdit() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        content: this.item.content,
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
      ).subscribe(result => {
      if (result) {
        this.item.content = dialogRef.componentInstance.content;
        this.onEdit.emit(this.item);
      }
    });
  }

  handleDelete() {
    //TODO: Confirm delete
    this.onDelete.emit(this.item);
  }

}
