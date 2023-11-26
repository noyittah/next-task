import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies from req', () => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toEqual('GET');

    req.flush(mockMovies);
  });

  it('should get movie details from req by id', () => {
    const mockMovieDetails = { id: 1, title: 'Movie 1', rating: 8 };

    service.getMovieDetails(1).subscribe(movieDetails => {
      expect(movieDetails).toEqual(mockMovieDetails);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/movies/1');
    expect(req.request.method).toEqual('GET');

    req.flush(mockMovieDetails);
  });

  it('should update search input', () => {
    const mockInput = 'space';

    service.updateSearchInput(mockInput);

    service.currentSearchInput.subscribe(input => {
      expect(input).toEqual(mockInput);
    });
  });
});
