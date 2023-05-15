import { AuthService } from './../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { Note } from 'src/app/interfaces/global.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  nodesList: Note[] = [];

  constructor(private auth: AuthService, private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.currentNoteList.subscribe(
      (noteList) => (this.nodesList = noteList)
    );
  }

  onSearchChange(event: any): void {
    const query = event.target.value;

    this.noteService.queryNote(query).subscribe((res: any) => {
      console.log('res', res);
      this.noteService.changeQueryStringContext(query);

      this.noteService.changeNoteListContext(res || []);
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
