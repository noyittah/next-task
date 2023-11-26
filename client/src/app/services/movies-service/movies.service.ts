import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MoviesService {

  private searchInput = new BehaviorSubject<string>('');
  currentSearchInput = this.searchInput.asObservable();

  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movies`);
  }

  public getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/${id}`);
  }

  public updateSearchInput(input: string): void {
    this.searchInput.next(input);
  }
}
