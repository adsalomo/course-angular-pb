import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}movie`);
  }

  create(movie: any) {
    return this.http.post(`${environment.apiUrl}movie/create`, movie);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}movie/delete/${id}`);
  }
}
