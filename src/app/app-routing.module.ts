import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MedicinesListComponent } from "./screens/medicines-list/medicines-list.component";
import { StoreProfileComponent } from "./screens/store-profile/store-profile.component";
import { MedicinesAddComponent } from "./screens/medicines-add/medicines-add.component";

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
    path: "**",
    component: MedicinesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
