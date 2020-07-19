import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Label} from '../../../../model/label';
import {LabelserviceService} from '../../../../services/labelservice.service'
import { FormGroup } from '@angular/forms';
import { Note } from 'src/app/model/note.model';
//import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.scss']
})
export class AddlabelComponent implements OnInit {

  createLabelform:FormGroup;
  note:Note;
   labels: Label[];
  label:Label = new Label();
  myLabel:any;
  n_id:string;
  

  // constructor(private labelServices:LabelserviceService,
  //   private snackBar: MatSnackBar) { }
  
  constructor(public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private labelService: LabelserviceService, private matSnackBar: MatSnackBar) {

      this.n_id = data.note.n_id;
       this.getAllLabel();

     }

  ngOnInit() {
  }

  getAllLabel(){
    this.labelService.getAllLabelsList().subscribe(
      (response:any) => {
        console.log("label list", response);
        this.labels = response.obj;
    
      }
    );
  }
  
  // onClickCreateLabel(){
  //   console.log("Inside Label" + this.label.labelId);
  //   this.labelServices.createLabel(this.label.labelId).subscribe(response => {
  //     console.log('Response ', response);
  //     this.snackBar.open('Label Created', 'Ok', { duration: 3000 });
  // },
  // error => {
  //   console.log(error);
  //   this.snackBar.open('not created Label', 'ok', { duration: 4000});
  // });
  // }

  createLabel(input){
    this.myLabel = input;
    localStorage.setItem("lableName",input);
    this.labelService.createLabel(this.label).subscribe(
      (response:any) => {
        console.log("input:", input);
        console.log("response:", response);
        this.matSnackBar.open("Label Created","Ok",{duration:2000});
        this.label = response.object;
        // console.log("label Id:",this.label.l_Id);
       this.addLabel();
    
      }
    );

  }

  addLabel(){
    
    console.log("Lable NoteId",this.n_id);
    console.log("labelName",this.myLabel)
    //this.label.labelName = this.myLabel;
    // this.labelService.addLabel(this.myLabel , this.n_id).subscribe(
    //   (response:any) => {
    //     this.label.labelName = this.myLabel;
    //     this.matSnackBar.open("Label added","Ok",{duration:3000});
    
    //   }
    // );
}
}