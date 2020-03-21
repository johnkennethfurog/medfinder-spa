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
import {
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { StoreProfileComponent } from "./screens/store-profile/store-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleTimeComponent } from "./_components/schedule-time/schedule-time.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MedicinesAddComponent } from "./screens/medicines-add/medicines-add.component";
import { MedicineEntryComponent } from "./_modal/medicine-entry/medicine-entry.component";
import { BtnLoadingComponent } from "./_components/btn-loading/btn-loading.component";
import { MedicinesAvailableListComponent } from "./screens/medicines-available-list/medicines-available-list.component";
import { MedicineAvailableEntryComponent } from "./_modal/medicine-available-entry/medicine-available-entry.component";
import { StoreEntryComponent } from "./_modal/store-entry/store-entry.component";
import { StoreListComponent } from "./screens/store-list/store-list.component";
import { SignInComponent } from "./screens/sign-in/sign-in.component";
import { ChangePasswordComponent } from "./_modal/change-password/change-password.component";
import { TokenInterceptor } from "./_utils/token-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ChangePasswordComponent,

    MedicinesAvailableListComponent,
    MedicinesListComponent,
    MedicineCardComponent,
    MedicineHeaderComponent,
    MedicinesAddComponent,

    MedicineAvailableEntryComponent,
    MedicineEntryComponent,

    BtnLoadingComponent,

    ScheduleTimeComponent,

    StoreProfileComponent,
    StoreEntryComponent,
    StoreListComponent
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
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MedicineEntryComponent,
    MedicineAvailableEntryComponent,
    StoreEntryComponent,
    ChangePasswordComponent
  ]
})
export class AppModule {}
