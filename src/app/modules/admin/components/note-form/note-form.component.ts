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
import {
  Note,
  NoteType,
  ObservableError,
} from 'src/app/interfaces/global.interface';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  @Input() isEdit!: boolean;
  @Input('data') editData: any = null;
  @Input() isOwner!: boolean;

  @Output() updateItemEvent = new EventEmitter<any>();

  notesList: Note[] = [];
  members: any[] = [];
  email: string = '';
  addMemberError: string = '';

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
  }

  ngOnInit(): void {
    this.noteService.currentNoteList.subscribe(
      (noteList) => (this.notesList = noteList)
    );

    if (this.editData) {
      this.noteForm.controls.isPin.setValue(this.editData.isPin);
      this.noteService.getOne(this.editData.id).subscribe((res: any) => {
        this.members = res.members;
      });
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
    event.preventDefault();
    this.noteForm.controls.isPin.setValue(!this.noteForm.get('isPin')?.value);
  }

  handleDelete() {
    return this.noteService.deleteOne(this.editData.id).subscribe(() => {
      this.noteService.refreshNotes();
    });
  }

  onSubmit() {
    if (this.noteForm.valid) {
      if (this.editData) {
        this.noteService
          .updateOne(this.editData.id, this.noteForm.value)
          .subscribe(() =>
            this.noteService.refreshNotes(
              this.isOwner ? NoteType.owner : NoteType.shared
            )
          );
      } else {
        this.noteService.create(this.noteForm.value).subscribe(() => {
          this.noteService.refreshNotes();
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

  addMember(event: any) {
    event.stopPropagation();
    event.preventDefault();
    return this.noteService
      .addMemberToNote(this.editData.id, this.email, 'user')
      .subscribe(
        (res: any) => {
          const { id, role, user } = res;
          this.members.push({ id, role, user });
          this.email = '';
          this.addMemberError = '';
        },
        (error: ObservableError) => {
          this.addMemberError = error.error.message;
        }
      );
  }

  removeMember(event: any, memberId: number) {
    event.stopPropagation();
    event.preventDefault();

    return this.noteService
      .removeMemberFromNote(memberId)
      .subscribe((res: any) => {
        this.members = this.members.filter(
          (member: any) => member.id !== memberId
        );
      });
  }
}
