import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateNote, Note } from 'src/app/interfaces/global.interface';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  headers: HttpHeaders;

  private noteSource = new BehaviorSubject<Note[]>([]);
  currentNoteList = this.noteSource.asObservable();

  private queryString$ = new BehaviorSubject<string>('');
  currentQuerystring = this.queryString$.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    const accessToken = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  }

  // * sharing notes data
  changeNoteListContext(noteList: Note[]) {
    this.noteSource.next(noteList);
  }

  // * sharing queryString data (change on header search bar)
  changeQueryStringContext(queryString: string) {
    this.queryString$.next(queryString);
  }

  create(body: CreateNote) {
    body.isPin = body.isPin || false;

    return this.http.post('http://localhost:3000/notes', body, {
      headers: this.headers,
    });
  }

  getAll() {
    return this.http.get('http://localhost:3000/notes/currentUserNote', {
      headers: this.headers,
    });
  }

  getOne(id: number) {
    return this.http.get(`http://localhost:3000/notes/${id}`, {
      headers: this.headers,
    });
  }

  queryNote(queryString: string) {
    return this.http.get('http://localhost:3000/notes', {
      headers: this.headers,
      params: { queryString },
    });
  }

  updateOne(id: number, body: Note) {
    return this.http.patch(`http://localhost:3000/notes/${id}`, body, {
      headers: this.headers,
    });
  }

  deleteOne(id: number) {
    return this.http.delete(`http://localhost:3000/notes/${id}`, {
      headers: this.headers,
    });
  }
}