import { Injectable, Input } from "@angular/core";
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { HttpService } from "../../app/services/http-service.service";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";
import { Note } from "../model/note.model";
import {Color} from "../model/color"

@Injectable({
  providedIn: "root"
})
export class NoteserviceService {

  private _refreshNeeded$= new Subject<void>();
  noteApiUrl: any;
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  private userApiUrl = environment.COLLABRATOR_API_URL;

  imageNoteUrl: any;
 
  constructor(private _http: HttpClient, private httpservice: HttpService) {}
  private searchNote=new Subject<any>();
  @Input() note: Note;


public noteColor: Color;
  private _notesList = new Subject<any>();
  private _subject = new Subject<any>();
  private _content = new BehaviorSubject<number>(0);
  public share = this._content.asObservable();


  private getAllPinnedNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_PINNED_NOTES_URL}`;

  public get autoRefesh() {
    return this._subject;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
      token: localStorage.getItem("token")
    })
  };

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  public createNote(note: any) {
    console.log("noteee" + note);
    return this.httpservice
      .post("http://localhost:8080/note/create ", note, this.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public getNote() {
    console.log("Inside getNote of service");
    return this.httpservice.get(
      "http://localhost:8080/note/fetch/notes",
      this.httpOptions
    );
  }

  public getAllReminderNotes() {
    console.log("Inside getNote of service");
    return this.httpservice.get(
      "http://localhost:8080/note/fetch/notes/reminders",
      this.httpOptions
    );
  }
  public getAllArchivedNotes() {
    console.log("Inside getNote of service");
    return this.httpservice.get(
      "http://localhost:8080/note/fetch/notes/archived",
      this.httpOptions
    );
  }
  public getAllTrashedNotes() {
    console.log("Inside getNote of service");
    return this.httpservice.get(
      "http://localhost:8080/note/fetch/notes/trashed",
      this.httpOptions
    );
  }

  public getAllPinnedNotes() {
    console.log("archived Service Reached");
    return this.httpservice.get(
      this.getAllPinnedNotesUrl,
      this.httpOptions
    );
  }

  public updateNote(note: Note) {
    console.log(
      "fetching token from header : ",
      this.httpOptions,
      "note for updation : ",
      note
    );
    return this.httpservice
      .put(
        `${environment.NOTE_API_URL + environment.UPDATE_NOTE_URL}`,
        note,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
  public deleteNote(noteId: any) {
    console.log("service reached with id     : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.DELETE_NOTE_URL}`
    );
    return this.httpservice
      .delete(
        `${environment.NOTE_API_URL}` +
          "/" +
          `${noteId}` +
          `${environment.DELETE_NOTE_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public archiveNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.ARCHIVE_NOTE_URL}`
    );
    return this.httpservice
      .delete(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.ARCHIVE_NOTE_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public collaNote(noteId: number,emailId:any) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.COLLABRATOR_API_URL}` +
        `${environment.COLLABRATOR_NOTE_URL}`+
        "?" +
        `email=${emailId}&noteId=${noteId}`
        
    );
    return this.httpservice
    .post(
      `${environment.COLLABRATOR_API_URL}` +
        
        `${environment.COLLABRATOR_NOTE_URL}`
        + 
        "?" +
        `email=${emailId}&noteId=${noteId}`,
      {},
      this.httpOptions
    )
    .pipe(
      tap(() => {
        this._subject.next();
      })
    );
  }

  // collaNote(noteId:number ,email:any)
  // {
  //   console.log("Collabrate Id", noteId);
  //   return this.httpservice.post(`${this.userApiUrl}${environment.COLLABRATOR_NOTE_URL}notesId=${noteId}?email=${email}`, {}, {headers:new HttpHeaders({'token':localStorage.token})});
  // }
  
  public deleteForeverNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.DELETE_FOREVER_NOTE_URL}`
    );
    return this.httpservice
      .delete(
        `${environment.NOTE_API_URL}` +
          "/" +
          `${noteId}` +
          `${environment.DELETE_FOREVER_NOTE_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public restoreNote(noteId: any) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        `${noteId}` +
        `${environment.RESTORE_NOTE_URL}`
    );
    return this.httpservice
      .put(
        `${environment.NOTE_API_URL}` +
          "/" +
          `${noteId}` +
          `${environment.RESTORE_NOTE_URL}`,
        {},
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public pinUnpinNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.PINNED_UNPINNED_NOTE_URL}`
    );
    return this.httpservice
      .patch(
        `${environment.NOTE_API_URL}` +
          "/" +
          `${noteId}` +
          `${environment.PINNED_UNPINNED_NOTE_URL}`,
        {},
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
}

public changeColor(noteId: number, color: string) {
  console.log("service reached with id : " + noteId);
  console.log(
    `${environment.NOTE_API_URL}` +
      "/" +
      noteId +
      `${environment.CHANGE_COLOR_NOTE_URL}${color}`
  );
  return this.httpservice
    .patch(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.CHANGE_COLOR_NOTE_URL}${color}`,
      {},
      this.httpOptions
    )
    .pipe(
      tap(() => {
        this._subject.next();
      })
    );
}
private view=new Subject<any>();
  setView(data:any){
  
    this.view.next({view:data});
    
   }
   
   getView():Observable<any>{
    return this.view.asObservable();
   }

   setSearchNoteData(message:any){
    return this.searchNote.next({note:message});
  }

  getSearchNotes():Observable<any>
{
  return this.searchNote.asObservable();
  
}

      
private uploadImageData = new FormData();
uploadImage(notesId:number,file:FormData):Observable<any>{
  
 // this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
//return this.httpService.post(this.noteApiUrl+this.imageNoteUrl,noteDetail,{headers:new HttpHeaders({'token':localStorage.token})});
return this.httpservice.put(`${this.noteApiUrl}${this.imageNoteUrl}?notesId=${notesId}&file=${file}`, "" , this.httpOptions);
}

// deleteReminder(noteId:number)
// {
// return this.httpservice.put(`${this.noteApiUrl}${environment.removeReminderUrl}?notesId=${noteId}`, " " , this.httpOptions);
// }
remindNote(noteId:number , reminder:any)
{
  console.log("remide url noteId",noteId);
  return this.httpservice.post
  (`${environment.NOTE_API_URL}${environment.REMIND_NOTE_URL}?noteId=${noteId}`,reminder , this.httpOptions);
}
// public remindNote(noteId: number,reminder:any) {
//   console.log("service reached with id : " + noteId);
//   console.log(
//     `${environment.NOTE_API_URL}`  
//     +
//     `${environment.REMIND_NOTE_URL}` +
//       "/" +
//      "?"+ noteId
//   );
//   return this.httpservice
//   .post(
//     `${environment.NOTE_API_URL}`  
//     +
//     `${environment.REMIND_NOTE_URL}` +
//       "/" +
//      "?"+ "noteId=" +`${noteId}`,
     
//     {},
//     this.httpOptions
//   )
//   .pipe(
//     tap(() => {
//       this._subject.next();
//     })
//   );
// }

public removeReminder(noteId: number) {
  console.log("service reached with id : " + noteId);
  console.log(
    `${environment.NOTE_API_URL}` +
      "/" +
      noteId +
      `${environment.REMIND_NOTE_URL}`
  );
  return this.httpservice
  .put(
    `${environment.NOTE_API_URL}` +
      "/" +
      `${noteId}` +
      `${environment.REMIND_NOTE_URL}`,
    {},
    this.httpOptions
  )
  .pipe(
    tap(() => {
      this._subject.next();
    })
  );
}

}
