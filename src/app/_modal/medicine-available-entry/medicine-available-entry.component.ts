import { Component, OnInit, Inject } from "@angular/core";
import { MedicineAvailable } from "src/app/_models/medicine-available";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MedicineService } from "src/app/_services/medicine.service";

@Component({
  selector: "app-medicine-available-entry",
  templateUrl: "./medicine-available-entry.component.html",
  styleUrls: ["./medicine-available-entry.component.css"]
})
export class MedicineAvailableEntryComponent implements OnInit {
  medForm: FormGroup;
  isCreatingNew = false;
  isLoading = false;

  get _getTitle(): string {
    return this.isCreatingNew ? "Create" : "Update";
  }

  constructor(
    private medicineService: MedicineService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MedicineAvailableEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MedicineAvailable
  ) {
    this.isCreatingNew = !data;
    this.initializeForm();
    this.setFormValue();
  }

  initializeForm() {
    this.medForm = this.fb.group({
      _id: this.fb.control(""),
      GenericName: this.fb.control("", Validators.required),
      BrandName: this.fb.control("", Validators.required),
      Size: this.fb.control(0, Validators.min(0.1)),
      UoM: this.fb.control("", Validators.required),
      NeedPresription: this.fb.control(false)
    });
  }

  setFormValue() {
    console.log(this.data);
    if (!this.isCreatingNew) {
      this.medForm.get("GenericName").setValue(this.data.GenericName);
      this.medForm.get("BrandName").setValue(this.data.BrandName);
      this.medForm.get("Size").setValue(this.data.Size);
      this.medForm.get("UoM").setValue(this.data.UoM);
      this.medForm.get("NeedPresription").setValue(this.data.NeedPresription);
      this.medForm.get("_id").setValue(this.data._id);
    }
  }

  ngOnInit() {}

  save() {
    if (this.isLoading) {
      return;
    }

    if (this.medForm.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.isCreatingNew) {
      this.createMedicine();
    } else {
      this.updateMedicine();
    }
  }

  createMedicine() {
    this.medicineService.addMedicine(this.medForm.value).subscribe(
      rspns => {
        this.dialogRef.close(rspns.data);
      },
      error => {
        console.log("error", error);
        this.isLoading = false;
      }
    );
  }

  updateMedicine() {
    this.medicineService.updateMedicine(this.medForm.value).subscribe(
      rspns => {
        this.dialogRef.close(rspns.data);
      },
      error => {
        console.log("error", error);
        this.isLoading = false;
      }
    );
  }
}
