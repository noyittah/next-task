import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../../components/movies/movie-details/movie-details.component';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: spy }],
    });
    service = TestBed.inject(ModalService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a modal', () => {
    const mockMovieId = 1;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => {} });
    dialogRefSpyObj.componentInstance = { closeModalEvent: { subscribe: () => {} } } as MovieDetailsComponent;
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    service.openModal(mockMovieId);

    expect(dialogSpy.open).toHaveBeenCalledWith(MovieDetailsComponent, {
      width: jasmine.any(String),
      height: jasmine.any(String),
      data: { movieId: mockMovieId },
    });
  });
});
