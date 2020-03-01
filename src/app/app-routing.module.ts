import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MedicinesListComponent } from "./screens/medicines-list/medicines-list.component";
import { StoreProfileComponent } from "./screens/store-profile/store-profile.component";
import { MedicinesAddComponent } from "./screens/medicines-add/medicines-add.component";
import { MedicinesAvailableListComponent } from "./screens/medicines-available-list/medicines-available-list.component";
import { StoreListComponent } from "./screens/store-list/store-list.component";

const routes: Routes = [
  {
    path: "profile",
    component: StoreProfileComponent
  },
  {
    path: "medicines-add",
    component: MedicinesAddComponent
  },

  {
    path: "store-list",
    component: StoreListComponent
  },
  {
    path: "medicines-available",
    component: MedicinesAvailableListComponent
  },
  {
    path: "**",
    component: MedicinesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
