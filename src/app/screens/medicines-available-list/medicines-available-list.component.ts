import { Component, OnInit } from "@angular/core";
import { MedicineAvailable } from "src/app/_models/medicine-available";
import { Medicine } from "src/app/_models/medicine";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { StoreService } from "src/app/_services/store.service";
import { MedicineService } from "src/app/_services/medicine.service";
import { MedicineEntryComponent } from "src/app/_modal/medicine-entry/medicine-entry.component";
import { MedicineAvailableEntryComponent } from "src/app/_modal/medicine-available-entry/medicine-available-entry.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-medicines-available-list",
  templateUrl: "./medicines-available-list.component.html",
  styleUrls: ["./medicines-available-list.component.css"]
})
export class MedicinesAvailableListComponent implements OnInit {
  displayedColumns: string[] = [
    "GenericName",
    "BrandName",
    "Size",
    "UoM",
    "edit",
    "remove"
  ];
  searchForm: FormGroup;

  dataSource;
  keyword = "";
  medicines: MedicineAvailable[];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
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
    this.medicineService.getAvailableMedicines().subscribe(rspns => {
      this.medicines = rspns.data;
      this.dataSource = new MatTableDataSource(this.medicines);
    });
  }

  applyFilter(filterValue: string) {
    this.keyword = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  remove(medicine: MedicineAvailable) {
    this.medicineService.deleteMedicine(medicine).subscribe(
      rspns => {
        const medicineInd = this.medicines.findIndex(
          x => x._id === medicine._id
        );
        this.medicines.splice(medicineInd, 1);
        this.dataSource = new MatTableDataSource(this.medicines);
        this.applyFilter(this.keyword);
      },
      error => {}
    );
  }

  create() {
    const medicineEntryDialog = this.dialog.open(
      MedicineAvailableEntryComponent,
      {
        width: "520px"
      }
    );

    medicineEntryDialog.afterClosed().subscribe(updatedMedicine => {
      if (updatedMedicine) {
        this.medicines.push(updatedMedicine);
        this.dataSource = new MatTableDataSource(this.medicines);
        this.applyFilter(this.keyword);
      }
    });
  }

  update(medicine: MedicineAvailable) {
    const medicineEntryDialog = this.dialog.open(
      MedicineAvailableEntryComponent,
      {
        width: "520px",
        data: medicine
      }
    );

    medicineEntryDialog.afterClosed().subscribe(updatedMedicine => {
      if (updatedMedicine) {
        const medicineInd = this.medicines.findIndex(
          x => x._id === updatedMedicine._id
        );
        this.medicines.splice(medicineInd, 1, updatedMedicine);
        this.dataSource = new MatTableDataSource(this.medicines);
        this.applyFilter(this.keyword);
      }
    });
  }
}
