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

import { CreateMedicineComponent } from "./_modal/create-medicine/create-medicine.component";
import { StoreProfileComponent } from "./screens/store-profile/store-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleTimeComponent } from "./_components/schedule-time/schedule-time.component";

@NgModule({
  declarations: [
    AppComponent,
    MedicinesListComponent,
    MedicineCardComponent,
    MedicineHeaderComponent,
    CreateMedicineComponent,

    ScheduleTimeComponent,

    StoreProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateMedicineComponent]
})
export class AppModule {}
