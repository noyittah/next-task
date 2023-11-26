import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { MoviesService } from './services/movies-service/movies.service';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponent,
    MoviesListComponent,
    SearchComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    MoviesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}