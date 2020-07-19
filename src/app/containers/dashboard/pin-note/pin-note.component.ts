import { Component, OnInit, Input } from '@angular/core';
import {Note} from '../.././../model/note.model'
import {NoteserviceService} from '../../../services/note-service.service'
import { MatMenuPanel, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.scss']
})
export class PinNoteComponent implements OnInit {

  isPinned: boolean;
  pin: boolean = true;
  unpin: boolean = true;
  @Input() note: Note;
  //notes = new Array<Note>();
  


  constructor(private noteService: NoteserviceService,
    private matSnackbar: MatSnackBar) { }

  ngOnInit() {
  }
  
  onPinNote() {
    console.log('pin note called '+this.note.n_id);
    this.noteService.pinUnpinNote(this.note.n_id).subscribe(response => {
      if(!this.pin) {
        this.matSnackbar.open('Note pinned', 'Ok', { duration: 4000 });
        this.pin = true;
        this.isPinned = true;
      }
      if(!this.unpin) {
        this.matSnackbar.open('Note unpinned', 'Ok', { duration: 4000});
        this.unpin = true;
        this.isPinned = false;
      }
    },
    error => {
      console.log(error);
      this.matSnackbar.open('Error....', 'Ok', { duration: 4000});
    });
  }

  pinNote()
  {
this.noteService.pinUnpinNote(this.note.n_id).subscribe(
  (response :any) => {
    console.log("NoteId: ", this.note.n_id);
    console.log("response : ", response);
    this.matSnackbar.open(response['message'], "Ok", { duration: 4000})
  }
);

  }
}
