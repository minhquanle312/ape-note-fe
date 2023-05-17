import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-note-actions',
  templateUrl: './note-actions.component.html',
  styleUrls: ['./note-actions.component.scss'],
})
export class NoteActionsComponent implements OnInit {
  @Input() data: any;
  @Input() hideDeleteBtn: boolean = false;
  @Input() hideTogglePinBtn: boolean = false;
  @Input() hideAddMemberBtn: boolean = false;

  @Output() onDelete = new EventEmitter<any>();
  @Output() onTogglePin = new EventEmitter<any>();
  @Output() onAddMember = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClickDelete(event: any) {
    event.stopPropagation();
    this.onDelete.emit(event);
  }

  onClickTogglePin(event: any) {
    event.stopPropagation();
    this.onTogglePin.emit(event);
  }

  onClickAddMember(event: any) {
    event.stopPropagation();
    this.onAddMember.emit(event);
  }
}
