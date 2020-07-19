import { Component, OnInit, Inject } from '@angular/core';
import {Label} from '../../../../model/label';
import {LabelserviceService} from '../../../../services/labelservice.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";


@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  label: Label = new Label();
  token = localStorage.getItem("token");
  renameClicked: boolean;
  labelsList: Label[]; 
  clickCancel: boolean;


  constructor(
    private labelService: LabelserviceService,
    private dialogRef: MatDialogRef<EditlabelComponent>,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _labelService: LabelserviceService,
  
  ) {
    
  }



  ngOnInit() {

    this.getAllLabels();
  }

  cancel() {
    this.clickCancel = true;
  }


  createLabel() {
    console.log('Label creation: ', this.label.labelName);
    this.labelService.createLabel(this.label).subscribe((response: any) => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }
  getAllLabels() {
    this.labelService.getAllLabelsList().subscribe((response: any) => {
      this.labelsList = response.object;
      console.log('Labels: ',response.object);
    });
   }

   onSubmit() {
    this.dialogRef.close();
    if(this.label.labelName !== null) {
      this.labelService.createLabel(this.label).subscribe((response: any) => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    }
  }

  onClickDeleteLabel(labelId) {
    console.log('Label delete ', labelId);
    this.labelService.deleteLabel(labelId).subscribe((response: any) => {
      console.log('Label deleted: ', response);
    },
    error => {
      console.log(error);
    });
  }

}
