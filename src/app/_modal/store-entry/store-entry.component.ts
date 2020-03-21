import { Component, OnInit } from "@angular/core";
import { StoreService } from "src/app/_services/store.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-store-entry",
  templateUrl: "./store-entry.component.html",
  styleUrls: ["./store-entry.component.css"]
})
export class StoreEntryComponent implements OnInit {
  storeForm: FormGroup;
  isLoading = false;

  constructor(
    private storeService: StoreService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StoreEntryComponent>
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.storeForm = this.fb.group({
      Name: this.fb.control("", Validators.required),
      Address: this.fb.control(""),
      ContactInfo: this.fb.control(""),
      Email: this.fb.control("", Validators.required),
      IsHealthCentre: this.fb.control(false)
    });
  }

  ngOnInit() {}

  save() {
    if (this.isLoading) {
      return;
    }

    if (this.storeForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.storeService.registerStore(this.storeForm.value).subscribe(
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
