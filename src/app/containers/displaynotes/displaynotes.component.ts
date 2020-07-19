import { Component, OnInit, Input } from "@angular/core";
import { NoteserviceService } from "../../services/note-service.service";
import { MatSnackBar,MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Note } from "src/app/model/note.model";
import {UpdateNoteComponent} from "../dashboard/update-note/update-note.component"
import {environment} from "../../../environments/environment"
import { Label } from 'src/app/model/label';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { UserModel } from 'src/app/model/user-model';
import { LabelserviceService } from 'src/app/services/labelservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';


export interface Fruit {
  name: string;
}

@Component({
  selector: "app-displaynotes",
  templateUrl: "./displaynotes.component.html",
  styleUrls: ["./displaynotes.component.scss"]
})

export class DisplaynotesComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  datePipeString : string;
  displayReminder :string;


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    // {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _noteService: NoteserviceService,
    private dialog: MatDialog, private datePipe: DatePipe,
    private noteService:NoteserviceService, private labelService:LabelserviceService,private userService:UserserviceService
  ) {}

  
  pin: boolean = true;
  unpin: boolean = true;
  private expand: any = false;
  @Input() notes: Note[];
  isPinned: boolean;
  searchNotes: any;
  view:any;
  others=new Array<Note>();
  note = new Array<Note>();
 //@Input() note: Note;
  pinned = new Array<Note>();
  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  pinnedNotes: boolean = false;
  @Input() noted: Note;
  lableName: string;
  label:Label = new Label();


  @Input() noteRem: Note;
  labels:Label[];
  collaborators:UserModel[];


  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllNotes();
    });
    
    this.getAllNotes();
    //this.getSearchNotes();
    this.getView();
  }
  getAllNotes() {
    console.log("get note called");
    this._noteService.getNote().subscribe((response: any) => {
      this.notes = response.notes;
      console.log("response ++++", response);
      console.log("all the notes in list notes", this.notes);
      console.log("value", this.notes.toString);
      this.lableName=localStorage.getItem("lableName");
    });
  }
  openPopup(note: any) {
    // const dialogRef = this.dialog.open(EditnoteComponent, {
    data: note;
  }


  openDialog(note): void {
    console.log("note Id:" + note.n_id);
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: 'auto',
      panelClass: 'custom-dialog-container',
      data: { note }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}


onPinNote() {
  console.log('pin note called '+this.noted.n_id);
  this._noteService.pinUnpinNote(this.noted.n_id).subscribe(response => {
    if(!this.pin) {
      this._snackBar.open('Note pinned', 'Ok', { duration: 4000 });
      this.pin = true;
      this.isPinned = true;
    }
    if(!this.unpin) {
      this._snackBar.open('Note unpinned', 'Ok', { duration: 4000});
      this.unpin = true;
      this.isPinned = false;
    }
  },
  error => {
    console.log(error);
    this._snackBar.open('Error....', 'Ok', { duration: 4000});
  });
}

pinNote()
{
this._noteService.pinUnpinNote(this.noted.n_id).subscribe(
(response :any) => {
  console.log("response : ", response);
  this._snackBar.open(response['message'], "Ok", { duration: 4000})
}
);

}

getPinnedNotes(){

  this.pinnedNotes = true;
  this.trashedNotes = false;
  this.archiveNotes = false;

this._noteService.getAllPinnedNotes().subscribe(
(response: any) => {
  console.log("response", response);
  console.log("notes:",response.obj);
  this.pinned = response['obj'];
}
// (error:any)=> {
//   this.matSnackBar.open(error.error.message, "failed", {duration:5000})
// }
);
}

//  getSearchNotes(){
//   this._noteService.getSearchNotes().subscribe(
//     (message: any) => {
// console.log("searchtitle",message.note);
//       this.searchNotes = message.note;
     
//     }
//   );
// }

getView(){
  this._noteService.getView().subscribe(
    (response:any)=>{
             this.view=response.view;
         }
  );
  
}

reminderNotes()
{
  this._noteService.getNote().subscribe(

    (response: any) => {
      console.log("response", response);
      console.log("notes:",response.obj);
      this.others = response['obj'];
       this.others.filter(note=>note.reminderDate != null).map(note=>this.notes.push(note));
    },  
    (error:any)=> {
      this._snackBar.open(error.error.message, "failed", {duration:5000})
    }
  );
}

slice()
  {
    var rem = this.noteRem.reminderDate;
    var today = this.datePipeString;
    if(rem!=null){
var res = rem.slice(0,-9);
    }
    else{
      res = null;
    }
console.log("result:",res);
console.log("this only:",today);

const cal = new Date();
cal.setDate(cal.getDate() + 1);
var reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
var tommorrowDate = this.datePipe.transform(reminderDate,'yyyy-MM-dd');

if(today==res)
{
  this.displayReminder = "Today,8:00PM"

}

else if(tommorrowDate==res){
this.displayReminder = "Tommorrow,8:00AM"
}

else{
  this.displayReminder = rem;
}

  }
  
  
  // removeLabel(label:any){
  //   this.labelService.deleteLabel(label.labelId , this.note.).subscribe(
  //     (response :any) => {
  //       console.log("response : ", response);
  //       this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
  //     }
  //   );
  // }
   
  pinNotes()
  {
this.noteService.pinUnpinNote(this.noteRem.n_id).subscribe(
  (response :any) => {
    console.log("response : ", response);
    this._snackBar.open(response['message'], "Ok", { duration: 4000})
  }
);
  
}


RestoreNote(){
  this.noteService.restoreNote(this.noteRem.n_id).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this._snackBar.open(response['message'], "Ok", { duration: 4000})
    }
    );
}

// deletePermanently(){
//   this.noteService.deleteNotePermanently(this.note.notesId).subscribe(
//     (response :any) => {
//       console.log("response : ", response);
//       this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
//     }
//   );
// }

// open(note) {
//   console.log("note updating", note);
//   const matDialogueReference = this.dialog.open(UpdatenoteComponent, {
//     width: "auto",
//     height: "auto",
//     data: { note }
//   });
//   matDialogueReference.afterClosed().subscribe(result => {
//     console.log("note updated");
//   });
// }

removeReminder(n_id:any){
  this.noteService.removeReminder(n_id).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this._snackBar.open(response['message'], "Ok", { duration: 4000})
    }
  )
}
}
