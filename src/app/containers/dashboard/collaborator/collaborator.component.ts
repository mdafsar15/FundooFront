import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RegisterModel } from 'src/app/model/register-model';
import { NoteserviceService } from 'src/app/services/note-service.service';
import { UserserviceService } from 'src/app/services/userservice.service';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  ownerName:String="Afsar";
  ownerEmail:String ="mdafsaransari720@gmail.com";
  n_id:number;
  collaborators:RegisterModel[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private noteService:NoteserviceService,private userService:UserserviceService,
  private matSnackBar: MatSnackBar) {

    this.n_id = data.n_id;
   }

  ngOnInit() {

    this.ownerEmail = localStorage.getItem('email');
    //this.getCollaborators();
  }

  addCollaborator(emailId)
  {
    console.log("email to add:",emailId);
    
    console.log("Add Collabrator NoteId",+this.n_id)
    this.noteService.collaNote(this.n_id,emailId).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    )
  }

  // removeCollaborator(email)
  // {
  //   console.log("email to remove:",email);
  // this.userService.deleteCollaborator(this.notesId , email).subscribe(
  //   (response:any)=>{
  //     this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
  //   },
  //   (error:any)=> {
  //       this.matSnackBar.open(error.error.message, "failed", {duration:5000});
  //     }
  // );
  //   }

  // getCollaborators()
  // {
  //  this.userService.getCollaborators(this.notesId).subscribe(
  //   (response:any)=>{
  //     // this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
  //     this.collaborators = response['obj'];
  //     console.log("collaborators list:",this.collaborators);
  //   },
  //   (error:any)=> {
  //       this.matSnackBar.open(error.error.message, "failed", {duration:5000});
  //     }
  //  ) 
  // }
}
