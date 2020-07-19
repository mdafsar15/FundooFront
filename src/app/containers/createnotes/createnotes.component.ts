import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/Model/note.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NoteserviceService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {
  reminderDate:string;
  datePipeString : string;
  tommorrowDate:string;
  setReminderDate:string;
  newDate:any=null;

  
  noteModel:Note = new Note();  
    createNoteform:FormGroup;
    card = false;
    clickCancel:boolean;
    open:boolean = false;
    @Input() note: Note;
  
    // note: Note = new Note();
  
  
    constructor(private router: Router,private formBuilder:FormBuilder ,
      private snackBar: MatSnackBar, private noteservice:NoteserviceService,private datePipe: DatePipe,private _matDialog: MatDialog,) {
        this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
     console.log("date today:",this.datePipeString);
       }
    // title = new FormControl(null, Validators.required)
    // description = new FormControl(null, Validators.required)
  
    ngOnInit() {
  
  
      this.createNoteform = this.formBuilder.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });
  
    }
    cardSwap1() {
  
      this.card = !this.card;
      console.log(this.card);
      console.log("card swapped")
    }
    // cardSwap() {
    //   console.log("card swapped again")
    //   let note = { title: this.title.value, description: this.description.value }
    //   if (!this.title.value && !this.description.value) {
    //     this.card = !this.card;
    //     console.log(this.card);
    //   } error => {
    //     console.log("error", error);
    //     this.snackBar.open("failed to add note", "ok", { duration: 5000 })
    //   }
    // }
  
    onSubmit() {
      console.log("inside submit");
      
        console.log("Close button clicked and no error");
        this.noteservice.createNote(this.createNoteform.value).subscribe(response => {
          console.log('Response ', response);
          localStorage.setItem("response",response.notes);
          // localStorage.setItem(this.createNoteform.value.title,response.notes);
          console.log("id=",response.notes[0]);
          this.snackBar.open('Note Created', 'Ok', { duration: 3000 });
          
      },
      error => {
        console.log(error);
        this.snackBar.open('not created', 'ok', { duration: 4000});
      });
  }
  openNote(){
    this.open = true;
  }

  today(note)
{
  let time:string="9:00";
this.reminderDate = this.datePipeString+","+time+":00";
let newDate = new Date(this.reminderDate);
console.log("Formated date:",newDate);
let reminder={
  reminder:newDate
}
this.noteservice.remindNote(note.n_id,reminder).subscribe(
  response => {
    console.log("Reminder NoteId",note.n_id);
    console.log("Reminder response : ", response);
    this.snackBar.open(response['message'], "ok", { duration: 4000 });
  }
);

}

addCollaborator(note){
  const dialogRef=this._matDialog.open(CreatenotesComponent,{
    data:{n_id:note.n_id}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("collaborator closed ");
  });
}

  

  
  
  }
 

   

