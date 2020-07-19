import { Component, OnInit, Input } from "@angular/core";
import { NoteserviceService } from "../../../services/note-service.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Note } from "src/app/model/note.model";
import {environment} from "../../../../environments/environment"

@Component({
  selector: "app-trashed-notes",
  templateUrl: "./trashed-notes.component.html",
  styleUrls: ["./trashed-notes.component.scss"]
})
export class TrashedNotesComponent implements OnInit {


  constructor(
    private _snackBar: MatSnackBar,
    // private _formBuilder: FormBuilder,
    private _noteService: NoteserviceService,
    private _router: Router
  ) {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllTrashedNotes();
    });
  }

  private expand: any = false;
  @Input()
  notes: Note;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllTrashedNotes();
    });
    this.getAllTrashedNotes();
  }
  getAllTrashedNotes() {
    console.log("get note called");
    this._noteService.getAllTrashedNotes().subscribe((response: any) => {
      this.notes = response.object;
      console.log("response ++++", response.object);
      console.log("all the notes in list notes", this.notes);
    });
  }
  openPopup(note: any) {
    // const dialogRef = this.dialog.open(EditnoteComponent, {
    data: note;
  }

  deleteForever(n_id) {
    console.log("note fetched for delete", n_id);
    this._noteService.deleteForeverNote(n_id).subscribe(
      response => {
        console.log("response : ", response);
        this._snackBar.open(response.message + " sucessfully", "ok", {
          duration: 4000
        });
      },
      errors => {
        console.log("errors : ", errors);
        if (errors.error.statusCode === 401) {
          localStorage.clear();
          this._router.navigateByUrl(`${environment.LOGIN_URL}`);
          this._snackBar.open(
            errors.error.message + " , login to continue.",
            "Opps!",
            {
              duration: 5000
            }
          );
        } else {
          this._snackBar.open(errors.error.message, "ok", {
            duration: 4000
          });
        }
      }
    );
  }

  restoreFromTrash(n_id) {
    console.log("note fetched for restore", n_id);
    this._noteService.restoreNote(n_id).subscribe(
      response => {
        console.log("response : ", response);
        this._snackBar.open(response.message + " sucessfully", "ok", {
          duration: 4000
        });
      },
      errors => {
        console.log("errors : ", errors);
        if (errors.error.statusCode === 401) {
          localStorage.clear();
          this._router.navigateByUrl(`${environment.LOGIN_URL}`);
          this._snackBar.open(
            errors.error.message + " , login to continue.",
            "Opps!",
            {
              duration: 5000
            }
          );
        } else {
          this._snackBar.open(errors.error.message, "ok", {
            duration: 4000
          });
        }
      }
    );
  }

}
