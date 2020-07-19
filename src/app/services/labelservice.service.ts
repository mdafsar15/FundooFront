import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpService } from "../services/http-service.service";
import { Subject } from "rxjs";
import { Label } from "../model/label";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LabelserviceService {

  private labelUrl = environment.LABEL_API_URL;
  private _subject = new Subject<any>();

  constructor(private _httpservice: HttpService) {}

  private fetchAllLabelsUrl: string = `${environment.LABEL_API_URL +
    environment.GET_ALL_LABELS_URL}`;


    private createLabelUrl: string = `${environment.LABEL_API_URL +
      environment.CREATE_LABEL_URL}`;

  private addLabelUrl: string = `${environment.LABEL_API_URL +
    environment.ADD_LABEL_URL}`;

  private renameLabelUrl: string = `${environment.LABEL_API_URL +
    environment.RENAME_LABEL_URL}`;

  public get autoRefesh() {
    return this._subject;
  }

  public getAllLabelsList() {
    console.log("all list fetching from service : ");
    return this._httpservice.get(
      this.fetchAllLabelsUrl,
      this._httpservice.httpOptions
    );
  }
  public createLabel(newLabel: any) {
    console.log("create label service reached");
    return this._httpservice
      .post(this.createLabelUrl, newLabel, this._httpservice.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public deleteLabel(labelId: number) {
    console.log("delete label service reached with label id : ", labelId);
    return this._httpservice
      .delete(
        `${environment.LABEL_API_URL}` +
          "/" +
          labelId +
          `${environment.DELETE_LABEL_URL}`,
        this._httpservice.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public renameLabel(labelId: number, labelName: string) {
    console.log("rename label service reached ");
    console.log(
      `${environment.LABEL_API_URL}` +
        "/" +
        labelId +
        `${environment.RENAME_LABEL_URL}` +
        labelName
    );

    return this._httpservice
      .put(
        `${environment.LABEL_API_URL}` +
          "/" +
          labelId +
          `${environment.RENAME_LABEL_URL}` +
          labelName,
        {},
        this._httpservice.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public addLabel(labelName: any,noteId:string) {
    console.log("create label service reached");
    return this._httpservice
      .afsar(this.addLabelUrl + noteId , labelName, this._httpservice.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }            
  // addLabel(labelName:any , notesId:number){
  //   return this._httpservice.post(`${this.labelUrl}${environment.ADD_LABEL_URL}notesId=${notesId}`,"" , this._httpservice.httpOptions);
  // }
  
  
}

