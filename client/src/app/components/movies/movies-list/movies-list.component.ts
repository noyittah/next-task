import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies-service/movies.service';
import { ModalService } from '../../../services/modal-service/modal.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit{
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchInput: any;

  constructor(
    private moviesService: MoviesService,
    private modalService: ModalService
  ){}

  ngOnInit(): void {

    this.moviesService.getMovies().subscribe((res) => {
      this.movies = res.map((movie) =>( {
          id: movie.id,
          image: movie.image,
          title: movie.title,
          year: movie.released,
          rating: movie.rating
      }));
      
    this.filterMoviesList();
    });

    this.moviesService.currentSearchInput.subscribe(
      (input) => {
        this.searchInput = input
        this.filterMoviesList();
      }
    );
  }

  private filterMoviesList(): void {
    this.filteredMovies = this.movies
    if (this.searchInput) {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    } else {
      this.filteredMovies = this.filteredMovies;
    }
  }

  public onSearchInputChanged(searchInput: string): void {
    this.moviesService.updateSearchInput(searchInput);
  }

  public openMovieDetails(movieId: number) {
    this.modalService.openModal(movieId);
  }
}
