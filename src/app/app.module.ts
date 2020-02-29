import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MedicinesListComponent } from "./screens/medicines-list/medicines-list.component";
import { MedicineCardComponent } from "./_components/medicine-card/medicine-card.component";
import { MedicineHeaderComponent } from "./_components/medicine-header/medicine-header.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatMenuModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";

import { StoreProfileComponent } from "./screens/store-profile/store-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleTimeComponent } from "./_components/schedule-time/schedule-time.component";
import { HttpClientModule } from "@angular/common/http";
import { MedicinesAddComponent } from "./screens/medicines-add/medicines-add.component";
import { MedicineEntryComponent } from "./_modal/medicine-entry/medicine-entry.component";

@NgModule({
  declarations: [
    AppComponent,
    MedicinesListComponent,
    MedicineCardComponent,
    MedicineHeaderComponent,
    MedicinesAddComponent,
    MedicineEntryComponent,

    ScheduleTimeComponent,

    StoreProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MedicineEntryComponent]
})
export class AppModule {}
