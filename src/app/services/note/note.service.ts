import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CreateNote,
  Note,
  NoteType,
} from 'src/app/interfaces/global.interface';
import { MemberRole } from 'src/app/types/type.global';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteSource = new BehaviorSubject<Note[]>([]);
  currentNoteList = this.noteSource.asObservable();

  private queryString$ = new BehaviorSubject<string>('');
  currentQuerystring = this.queryString$.asObservable();

  constructor(private http: HttpClient) {}

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

    return this.http.post('/notes', body);
  }

  getAll(type: NoteType = NoteType.owner) {
    return this.http.get(`/notes/${type}`);
  }

  refreshNotes(type?: NoteType) {
    this.getAll(type).subscribe((res: any) => {
      this.changeNoteListContext(res);
    });
  }

  getOne(id: number) {
    return this.http.get(`/notes/${id}`);
  }

  queryNote(queryString: string) {
    return this.http.get('/notes', {
      params: { queryString },
    });
  }

  updateOne(id: number, body: Note) {
    return this.http.patch(`/notes/${id}`, body);
  }

  deleteOne(id: number) {
    return this.http.delete(`/notes/${id}`);
  }

  addMemberToNote(noteId: number, email: string, role: MemberRole) {
    return this.http.post(`/notes/${noteId}/members`, {
      role,
      email,
    });
  }

  removeMemberFromNote(id: number) {
    return this.http.delete(`/notes/members/${id}`);
  }
}
