import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {NoteserviceService} from '../../services/note-service.service'
import { MatSnackBar ,MatDialog} from "@angular/material";
import {Label} from '../../model/label';
import {EditlabelComponent} from '../dashboard/label/editlabel/editlabel.component';
import {LabelserviceService} from '../../services/labelservice.service';
import {environment} from '../../../environments/environment';
import {AddlabelComponent} from '../dashboard/label/addlabel/addlabel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: any = " ";
  icon: String = 'dashboard';
  label: Label;
  labelsList: Label[];
  view: boolean = false;
  grid = "row";
  title: String;

  constructor(        
    private _noteService: NoteserviceService,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _labelService: LabelserviceService,
    private _matDialog: MatDialog
) { }

  ngOnInit() {
   this.getAllLabels();
  }
  logout() {
    console.log("signing out => clearing token");
    this._matSnackBar.open(" sucessfully logged out", "ok", {
      duration: 5000
    });

    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  getEmail()
{
  return localStorage.getItem('email');
}

  openEditLabelDialog() {
    const dialogRef = this._matDialog.open(EditlabelComponent, {
      width: "330px",
      height: "Auto",
      maxHeight: "450px",
      panelClass: "custom-dialog-container-label",
      data: this.labelsList
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed with out any change");
    });
  }

  getAllLabels() {
    this._labelService.getAllLabelsList().subscribe((response: any) => {
      this.labelsList = response.object;
      console.log(response.object);
    });
   }

   refresh() {
    console.log("reloading");
  window.location.reload();
  }

  getView() {
    if(this.view==true){
      this.view=false;
      this.grid="row";
    }
    else{
      this.view=true;
      this.grid="column";
    }
      // this.router.navigate(['/dashboard/displaynote'], { queryParams: { note: 'view', view: this.grid } });
      this._noteService.setView(this.grid);
    console.log(this.view);
  }

  searchNote() {
    console.log("title",this.title);
    this._noteService.setSearchNoteData(this.title);
  }
}
