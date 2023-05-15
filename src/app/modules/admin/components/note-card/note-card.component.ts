import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
// import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  providers: [],
})
export class NoteCardComponent implements OnInit {
  @Input() data: any;
  @Output() deleteNoteEvent = new EventEmitter<any>();

  queryString: string = '';

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.currentQuerystring.subscribe(
      (queryString) => (this.queryString = queryString)
    );
  }

  isVisible = false;
  @Input() formData: any;

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleDeleteNote(event: any) {
    event.stopPropagation();
    return this.noteService.deleteOne(this.data.id).subscribe(() => {
      this.deleteNoteEvent.emit(this.data.id);
    });
    // return this.noteService.deleteNote(this.data.id).subscribe(() => {
    //   this.deleteNoteEvent.emit(this.data.id);

    //   this.noteService.changeNoteList(
    //     this.noteList.filter((note) => note.id !== this.data.id)
    //   );
    // });
  }
}
