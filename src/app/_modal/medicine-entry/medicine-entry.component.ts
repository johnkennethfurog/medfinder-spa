import { Component, OnInit, Inject } from "@angular/core";
import { Medicine } from "src/app/_models/medicine";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-medicine-entry",
  templateUrl: "./medicine-entry.component.html",
  styleUrls: ["./medicine-entry.component.css"],
})
export class MedicineEntryComponent implements OnInit {
  medForm: FormGroup;
  medicine: Medicine;
  isHealthCenter: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MedicineEntryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { med: Medicine; isHealthCenter: boolean }
  ) {
    this.medicine = data.med;
    this.isHealthCenter = data.isHealthCenter;
    this.initializeForm();
  }

  initializeForm() {
    const isFree = this.medicine.Srp === 0;

    this.medForm = this.fb.group({
      Srp: this.fb.control(
        {
          value: this.medicine.Srp,
          disabled: isFree,
        },
        Validators.min(1)
      ),
      Qty: this.fb.control(this.medicine.Qty, Validators.min(1)),
      Margin: this.fb.control({
        value: this.medicine.Margin,
        disabled: isFree,
      }),
      isFree: this.fb.control(isFree),
    });
  }

  ngOnInit() {}

  save() {
    if (this.medForm.invalid) {
      return;
    }
    const formValue = this.medForm.getRawValue();

    this.medicine.Qty = formValue.Qty;
    this.medicine.Srp = formValue.Srp;
    this.medicine.Margin = formValue.Margin;

    this.dialogRef.close(this.medicine);
  }

  onIsFreeChange(isFree): void {
    if (isFree) {
      this.medForm.controls.Srp.clearValidators();
      this.medForm.controls.Srp.disable();
      this.medForm.controls.Margin.disable();
      this.medForm.patchValue({
        Srp: 0,
        Margin: 0,
      });
    } else {
      this.medForm.controls.Srp.setValidators(Validators.min(1));
      this.medForm.controls.Srp.enable();
      this.medForm.controls.Margin.enable();
    }
  }
}
