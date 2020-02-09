import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-create-medicine",
  templateUrl: "./create-medicine.component.html",
  styleUrls: ["./create-medicine.component.css"]
})
export class CreateMedicineComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateMedicineComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {}
}
