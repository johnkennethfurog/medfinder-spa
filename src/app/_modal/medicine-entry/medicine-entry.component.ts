import { Component, OnInit, Inject } from "@angular/core";
import { Medicine } from "src/app/_models/medicine";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-medicine-entry",
  templateUrl: "./medicine-entry.component.html",
  styleUrls: ["./medicine-entry.component.css"]
})
export class MedicineEntryComponent implements OnInit {
  medForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MedicineEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medicine
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.medForm = this.fb.group({
      Qty: this.fb.control(this.data.Qty),
      Srp: this.fb.control(this.data.Srp, Validators.min(0.1)),
      Margin: this.fb.control(this.data.Margin)
    });
  }

  ngOnInit() {}

  save() {
    if (this.medForm.invalid) {
      return;
    }
    const formValue = this.medForm.value;

    this.data.Qty = formValue.Qty;
    this.data.Srp = formValue.Srp;
    this.data.Margin = formValue.Margin;

    this.dialogRef.close(this.data);
  }
}
