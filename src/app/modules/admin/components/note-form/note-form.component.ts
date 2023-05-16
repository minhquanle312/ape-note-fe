import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/global.interface';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  @Input() isEdit!: boolean;
  @Input('data') editData: any = null;

  @Output() updateItemEvent = new EventEmitter<any>();

  notesList: Note[] = [];

  // TODO: try use FromGroup and FormControl to create form
  // form!: UntypedFormGroup;
  expand: boolean;
  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    isPin: new FormControl(false),
  });

  constructor(private noteService: NoteService, private eRef: ElementRef) {
    this.expand = this.isEdit;

    console.log('noteForm', this.editData, this.noteForm);
  }

  ngOnInit(): void {
    this.noteService.currentNoteList.subscribe(
      (noteList) => (this.notesList = noteList)
    );

    if (this.editData) {
      this.noteForm.controls.isPin.setValue(this.editData.isPin);
    }
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      // * click inside
      return;
    } else {
      // * click outside
      if (this.isEdit) return;

      this.onSubmit();
      this.expand = false;
      this.noteForm.reset();
    }
  }

  togglePin(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.noteForm.controls.isPin.setValue(!this.noteForm.get('isPin')?.value);
  }

  onSubmit() {
    if (this.noteForm.valid) {
      if (this.editData) {
        this.noteService
          .updateOne(this.editData.id, this.noteForm.value)
          .subscribe(() =>
            this.noteService.getAll().subscribe((res: any) => {
              this.noteService.changeNoteListContext(res);
            })
          );
      } else {
        this.noteService.create(this.noteForm.value).subscribe(() => {
          this.noteService.getAll().subscribe((res: any) => {
            this.noteService.changeNoteListContext(res);
          });
        });
        this.noteForm.reset();
        this.expand = this.isEdit || false;
      }
    } else {
      Object.values(this.noteForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
