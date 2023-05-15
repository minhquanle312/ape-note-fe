import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/global.interface';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
})
export class NotesContainerComponent implements OnInit {
  notesList: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.currentNoteList.subscribe(
      (noteList) => (this.notesList = noteList)
    );

    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAll().subscribe((res: any) => {
      this.noteService.changeNoteListContext(res);
    });
  }

  handleDeleteNote() {
    this.getAllNotes();
  }
}
