import { Component, EventEmitter, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { MoviesService } from '../../../services/movies-service/movies.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<void>();
  private overlay: any;

  movieDetails: any = {
    image: '',
    title: '',
    time: '',
    rating: 0,
    summary: ''
  };

  constructor(
    private moviesService: MoviesService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.overlay = this.renderer.createElement('div');
    this.renderer.addClass(this.overlay, 'overlay');
    this.renderer.appendChild(document.body, this.overlay);

      this.moviesService.getMovieDetails(this.data.movieId).subscribe((res) => {
      this.movieDetails.image = res[0].image;
      this.movieDetails.rating = res[0].rating;
      this.movieDetails.time = this.changeRunTimeFormat(res[0].runtime);
      this.movieDetails.summary = this.sanitizeHTML(res[0].synopsis);
      this.movieDetails.title = res[0].title;
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this.overlay);
  }

  private changeRunTimeFormat(runTime: string): string {
    if (!runTime) {
      return '';
    }
    const [hours, minutes] = runTime.split(/[hm]/).filter(Boolean);
    return `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''}`.trim();
  }

  private sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
