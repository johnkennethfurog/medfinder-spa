import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store } from "src/app/_models/store";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { StoreService } from "src/app/_services/store.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { StoreEntryComponent } from "src/app/_modal/store-entry/store-entry.component";

@Component({
  selector: "app-store-list",
  templateUrl: "./store-list.component.html",
  styleUrls: ["./store-list.component.css"]
})
export class StoreListComponent implements OnInit {
  displayedColumns: string[] = [
    "Name",
    "Address",
    "ContactInfo",
    "Type",
    "edit"
  ];
  searchForm: FormGroup;

  dataSource;
  keyword = "";
  stores: Store[];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.loadStores();
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

  loadStores() {
    this.storeService.getStores().subscribe(rspns => {
      this.stores = rspns.data;
      this.dataSource = new MatTableDataSource(this.stores);
    });
  }

  applyFilter(filterValue: string) {
    this.keyword = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    const medicineEntryDialog = this.dialog.open(StoreEntryComponent, {
      width: "520px"
    });

    medicineEntryDialog.afterClosed().subscribe(newStore => {
      if (newStore) {
        this.stores.push(newStore);
        this.dataSource = new MatTableDataSource(this.stores);
        this.applyFilter(this.keyword);
      }
    });
  }

  resetPassword(store: Store) {
    if (store.isLoading) {
      return;
    }

    store.isLoading = true;
    this.storeService.resetPassword(store._id).subscribe(
      rsps => {
        store.isLoading = false;
      },
      error => {
        console.log("error");
        store.isLoading = false;
      }
    );
  }
}
