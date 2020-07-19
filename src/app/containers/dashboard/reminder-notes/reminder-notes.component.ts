import { Component, OnInit, Input } from "@angular/core";
import { NoteserviceService } from "../../../services/note-service.service";
import { Note } from "src/app/model/note.model";

@Component({
  selector: "app-reminder-notes",
  templateUrl: "./reminder-notes.component.html",
  styleUrls: ["./reminder-notes.component.scss"]
})
export class ReminderNotesComponent implements OnInit {
  constructor(private _noteService: NoteserviceService) {}

 @Input() notes: Note[];

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllReminderNotes();
    });
    this.getAllReminderNotes();
  }

  getAllReminderNotes() {
    console.log("get note called");
    this._noteService.getAllReminderNotes().subscribe((response: any) => {
      this.notes = response.object;
      console.log("response ++++", response.object);
      console.log("all the notes in list notes", this.notes);
    });
  }
  openPopup(note: any) {
    // const dialogRef = this.dialog.open(EditnoteComponent, {
    data: note;
  }

}
