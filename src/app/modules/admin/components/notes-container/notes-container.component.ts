import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note, NoteType } from 'src/app/interfaces/global.interface';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
})
export class NotesContainerComponent implements OnInit {
  notesList: Note[] = [];
  isHomePage!: boolean;

  constructor(private router: Router, private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.currentNoteList.subscribe(
      (noteList) => (this.notesList = noteList)
    );

    this.getCurrentUrl();

    this.noteService.refreshNotes(
      this.isHomePage ? NoteType.owner : NoteType.shared
    );
  }

  getCurrentUrl() {
    this.isHomePage = this.router.url.includes('home');
  }

  filterPinNotes(note: any) {
    return this?.isHomePage ? note.isPin : note;
  }
  filterUnPinNotes(note: any) {
    return !note.isPin;
  }

  handleDeleteNote() {
    this.noteService.refreshNotes();
  }
}
