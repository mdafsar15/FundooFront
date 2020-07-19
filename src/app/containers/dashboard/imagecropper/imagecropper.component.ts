import { Component, OnInit, NgModule, Inject } from "@angular/core";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { from } from "rxjs";
import { DashboardComponent } from '../dashboard.component';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: "app-imagecropper",
  templateUrl: "./imagecropper.component.html",
  styleUrls: ["./imagecropper.component.scss"]
})
export class ImagecropperComponent implements OnInit {
  imagecroped: any;
  response: any;
  img: any;
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private userService: UserserviceService
  ) {}

  ngOnInit() {}

  imageCropped($event) {
    console.log("data", this.data);

    console.log("cropper==>", $event);

    this.img = $event.file;
    console.log("kdsghfdsghfdsakljidfhsifhdkaishihf", this.img);
  }

  close() {
    this.dialogRef.close();
  }
  submit() {
    var formData = new FormData();
    formData.append("image", this.img);
    this.userService.profilePic(formData).subscribe(data => {
      console.log("------------------------------", data);

      this.dialogRef.close(data);
      this.response = data;
      localStorage.setItem("image", this.response.profilePic);
    });
  }
}
