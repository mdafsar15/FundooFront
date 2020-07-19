import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import {Note} from '../../../model/note.model'
import {NoteserviceService} from '../../../services/note-service.service'

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  note: Note;

  constructor(public _matDialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _noteService: NoteserviceService,
private _snackbar: MatSnackBar) {
  this.note = this.data.note;
 }

  ngOnInit() {
  }
  onSubmit() {
    // data is getting fetched
    console.log("data recieved from Updated note : ", this.note.n_id);

    this._matDialogRef.close();
    this._noteService.updateNote(this.note).subscribe(
      (response: any) => {
        console.log("response on closing mat dialogue: ", response);
        this._snackbar.open(response.message + " sucessfully...", "ok", {
          duration: 4000
        });
      },
      errors => {
        console.log("Opps found errors.", errors);
        this._snackbar.open(errors.error.message, "ok", {
          duration: 4000
        });
      }
    );
}

}
