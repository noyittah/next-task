import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MoviesService } from '../../../services/movies-service/movies.service';
import { ModalService } from '../../../services/modal-service/modal.service';
import { of } from 'rxjs';
import { SearchComponent } from '../../../components/search/search.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MoviesService', ['getMovies', 'updateSearchInput', 'openModal']);

    TestBed.configureTestingModule({
      declarations: [MoviesListComponent, SearchComponent],
      providers: [
        { provide: MoviesService, useValue: spy },
        { provide: ModalService, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    moviesServiceSpy = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovies on ngOnInit', fakeAsync(() => {
    const mockMovies = [
      { id: 1, image: 'movie1.jpg', title: 'Movie 1', year: 2022, rating: 4.5 },
      { id: 2, image: 'movie2.jpg', title: 'Movie 2', year: 2023, rating: 3.8 },
    ];

    moviesServiceSpy.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();
    tick(5000);
    fixture.detectChanges();
    expect(component.movies).toEqual(mockMovies);
    expect(moviesServiceSpy.getMovies).toHaveBeenCalled();
  }));

  it('should update searchInput and call filterMoviesList on onSearchInputChanged', fakeAsync(() => {
    const mockSearchInput = 'search';

    component.onSearchInputChanged(mockSearchInput);
    tick();
    expect(component.searchInput).toEqual('');
    expect(moviesServiceSpy.updateSearchInput).toHaveBeenCalledWith(mockSearchInput);
    expect(component.filteredMovies).toEqual([]);
  }));
});
