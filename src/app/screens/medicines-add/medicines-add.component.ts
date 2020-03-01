import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { MedicineAvailable } from "src/app/_models/medicine-available";
import { MedicineService } from "src/app/_services/medicine.service";
import { Observable, fromEvent } from "rxjs";
import {
  startWith,
  debounce,
  debounceTime,
  distinctUntilChanged,
  map
} from "rxjs/operators";
import { Medicine } from "src/app/_models/medicine";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { MedicineEntryComponent } from "src/app/_modal/medicine-entry/medicine-entry.component";
import { StoreService } from "src/app/_services/store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-medicines-add",
  templateUrl: "./medicines-add.component.html",
  styleUrls: ["./medicines-add.component.css"]
})
export class MedicinesAddComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "GenericName",
    "BrandName",
    "Size",
    "UoM",
    "Srp",
    "Margin",
    "Qty",
    "remove"
  ];
  dataSource;

  searchForm: FormGroup;
  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;

  availableMedicines: MedicineAvailable[];
  filteredMedicines: Observable<MedicineAvailable[]>;

  medicinesToAdd: Medicine[] = [];
  storeMedicineIds: string[];

  isLoading = false;

  constructor(
    private medicineService: MedicineService,
    private storeService: StoreService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.storeMedicineIds = storeService.getStoreMedicineIds();
  }

  ngOnInit() {
    this.loadAvailableMedicines();
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      search: this.fb.control("")
    });
  }

  ngAfterViewInit(): void {}

  subscribeToSearchValueChange() {
    const searchControl = this.searchForm.get("search") as FormControl;

    this.filteredMedicines = searchControl.valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      distinctUntilChanged(),
      map(value => {
        if (value && value.constructor.name === "Object") {
          this.addMedicineToList(value);
          return;
        } else {
          return value
            ? this._filterMedicines(value)
            : this.availableMedicines.slice();
        }
      })
    );
  }

  private addMedicineToList(medicine: MedicineAvailable) {
    const medicineEntryDialog = this.dialog.open(MedicineEntryComponent, {
      width: "520px",
      data: {
        ...medicine,
        MedicineId: medicine._id,
        Srp: 0,
        Margin: 0,
        Qty: 0
      }
    });

    medicineEntryDialog.afterClosed().subscribe(addedMedicine => {
      if (addedMedicine) {
        this.medicinesToAdd.push(addedMedicine);
        this.dataSource = new MatTableDataSource(this.medicinesToAdd);
      }
      this.searchInput.nativeElement.focus();
    });
  }

  private _filterMedicines(value): MedicineAvailable[] {
    const filteredAvailableMedicines = this.availableMedicines.filter(
      med =>
        this.medicinesToAdd.findIndex(x => x.MedicineId === med._id) < 0 &&
        !this.storeMedicineIds.includes(med._id)
    );

    const filterValue = value.toLowerCase();
    return filteredAvailableMedicines.filter(
      medicine => medicine.BrandName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(medicine?: MedicineAvailable): string | undefined {
    return "";
  }

  loadAvailableMedicines() {
    this.medicineService.getAvailableMedicines().subscribe(rspns => {
      this.availableMedicines = rspns.data;
      this.subscribeToSearchValueChange();
    });
  }

  save() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.storeService.addMedicines(this.medicinesToAdd).subscribe(
      rspns => {
        this.isLoading = false;
        this.router.navigate(["home"]);
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  remove(medicine: Medicine) {
    const medIndex = this.medicinesToAdd.findIndex(
      x => x.MedicineId === medicine.MedicineId
    );
    this.medicinesToAdd.splice(medIndex, 1);
    this.dataSource = new MatTableDataSource(this.medicinesToAdd);
    this.searchInput.nativeElement.focus();
  }
}
