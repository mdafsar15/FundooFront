import { Component, OnInit } from "@angular/core";
import { NoteserviceService } from "../../../services/note-service.service";
import { Note } from "src/app/model/note.model";

@Component({
  selector: "app-archived-notes",
  templateUrl: "./archived-notes.component.html",
  styleUrls: ["./archived-notes.component.scss"]
})
export class ArchivedNotesComponent implements OnInit {
  constructor(private _noteService: NoteserviceService) {}

  notes: Note[];

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllArchivedNotes();
    });
    this.getAllArchivedNotes();
  }

  getAllArchivedNotes() {
    console.log("get note called");
    this._noteService.getAllArchivedNotes().subscribe((response: any) => {
      this.notes = response.object;
      console.log("response ++++", response);
      console.log("all the notes in list notes", this.notes);
    });
  }
  openPopup(note: any) {
    // const dialogRef = this.dialog.open(EditnoteComponent, {
    data: note;
  }
}
