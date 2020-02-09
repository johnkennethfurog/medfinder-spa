import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreateMedicineComponent } from "src/app/_modal/create-medicine/create-medicine.component";

@Component({
  selector: "app-medicines-list",
  templateUrl: "./medicines-list.component.html",
  styleUrls: ["./medicines-list.component.css"]
})
export class MedicinesListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  showMedicineModal(): void {
    const dialogRef = this.dialog.open(CreateMedicineComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
