import { Component, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { StoreService } from "src/app/_services/store.service";
import { Medicine } from "src/app/_models/medicine";
import { MedicineService } from "src/app/_services/medicine.service";
import { MedicineEntryComponent } from "src/app/_modal/medicine-entry/medicine-entry.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-medicines-list",
  templateUrl: "./medicines-list.component.html",
  styleUrls: ["./medicines-list.component.css"]
})
export class MedicinesListComponent implements OnInit {
  displayedColumns: string[] = [
    "GenericName",
    "BrandName",
    "Size",
    "UoM",
    "Qty",
    "Margin",
    "Srp",
    "edit",
    "remove"
  ];

  dataSource;
  searchForm: FormGroup;

  medicines: Medicine[];

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private fb: FormBuilder,
    private medicineService: MedicineService
  ) {}

  ngOnInit() {
    this.loadMedicines();
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      search: this.fb.control("")
    });

    this.searchForm
      .get("search")
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(keyword => {
        this.applyFilter(keyword);
      });
  }

  loadMedicines() {
    this.storeService.getMedicines().subscribe(rspns => {
      this.medicines = rspns.data.Medicines;
      this.dataSource = new MatTableDataSource(this.medicines);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  remove(medicine: Medicine) {
    this.storeService.removeMedicine(medicine).subscribe(
      rspns => {
        const medicineInd = this.medicines.findIndex(
          x => x.MedicineId === medicine.MedicineId
        );
        this.medicines.splice(medicineInd, 1);
        this.storeService.setStoreIds(this.medicines);
        this.dataSource = new MatTableDataSource(this.medicines);
      },
      error => {}
    );
  }

  update(medicine: Medicine) {
    const medicineEntryDialog = this.dialog.open(MedicineEntryComponent, {
      width: "520px",
      data: medicine
    });

    medicineEntryDialog.afterClosed().subscribe(updatedMedicine => {
      if (updatedMedicine) {
        this.storeService.updateMedicine(updatedMedicine).subscribe(rspns => {
          const medicineInd = this.medicines.findIndex(
            x => x.MedicineId === medicine.MedicineId
          );
          this.medicines.splice(medicineInd, 1, updatedMedicine);
          this.dataSource = new MatTableDataSource(this.medicines);
        });
      }
    });
  }
}
