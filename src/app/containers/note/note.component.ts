import { Component, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Note} from '../../model/note.model';
import { NoteserviceService } from '../../services/note-service.service';
import {UpdateNoteComponent} from "../dashboard/update-note/update-note.component"
import {environment} from "../../../environments/environment"
import { Label } from 'src/app/model/label';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
    
  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  pinnedNotes: boolean = false;

  others=new Array<Note>();
  notes = new Array<Note>();
  pinned = new Array<Note>();
  searchNotes: any;
  view:any;

  constructor(    private route: Router,
    private matSnackBar: MatSnackBar,
    private noteService:NoteserviceService , private router:ActivatedRoute) { }

   private param:any;

  ngOnInit() {
    this.noteService.autoRefresh.subscribe(() => {
      this.getOtherNotes();
      this.getPinnedNotes();
    });

    this.router.queryParams.subscribe(params=>{this.param=params['note'];
    if (this.param == "archive") 
    {
      this.getArchivedNotes();
    }
    else if(this.param == "trash")
    {
      this.getTrashedNotes();
    }
    else
    {
     this.getOtherNotes();
     this.getPinnedNotes();
     this.getView();
     
    }
    
  
    });

    this.getSearchNotes();
  }

  getOtherNotes(){

    this.trashedNotes = false;
    this.archiveNotes = false;

    this.noteService.getNote().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.object);
        this.others = response['obj'];
         this.others.filter(note=>note.isPinned===false&&note.isArchived===false&&note.isTrashed==false).map(note=>this.notes.push(note));
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }


  getArchivedNotes(){

    this.archiveNotes = true;
    this.trashedNotes = false;
    
    this.noteService.getAllArchivedNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        this.notes = response['obj'];
          
      }
    );
  }


  getTrashedNotes(){
    this.trashedNotes = true;
   
    this.noteService.getAllTrashedNotes().subscribe(

      (response: any) => {
        console.log("response", response);
      
        this.notes = response['obj'];
          
      }
    )
  }

  getPinnedNotes(){

    this.pinnedNotes = true;
    this.trashedNotes = false;
    this.archiveNotes = false;

this.noteService.getAllPinnedNotes().subscribe(
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


  getSearchNotes(){
    this.noteService.getSearchNotes().subscribe(
      (message: any) => {
console.log("searchtitle",message.notes);
        this.searchNotes = message.notes;
       
      }
    );
  }


  getView(){
    this.noteService.getView().subscribe(
      (response:any)=>{
               this.view=response.view;
           }
    );
    
  }


  reminderNotes()
  {
    this.noteService.getNote().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.obj);
        this.others = response['obj'];
         this.others.filter(note=>note.reminderDate != null).map(note=>this.notes.push(note));
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }



    
  }
  
  
  
  
  
  
  


  




