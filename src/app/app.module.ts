import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewsComponent} from './components/news/news.component';
import {NewsService} from "./services/news.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {EditDialogComponent} from './components/edit-dialog/edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CardComponent} from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    EditDialogComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
