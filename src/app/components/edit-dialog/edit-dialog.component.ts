import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  content: string = this.data.content;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { content: string }) {
  }

  ngOnInit(): void {
  }

}
