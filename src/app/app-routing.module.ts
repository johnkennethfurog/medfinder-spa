import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MedicinesListComponent } from "./screens/medicines-list/medicines-list.component";
import { StoreProfileComponent } from "./screens/store-profile/store-profile.component";
import { MedicinesAddComponent } from "./screens/medicines-add/medicines-add.component";
import { MedicinesAvailableListComponent } from "./screens/medicines-available-list/medicines-available-list.component";
import { StoreListComponent } from "./screens/store-list/store-list.component";
import { SignInComponent } from "./screens/sign-in/sign-in.component";
import { AuthenticationGuard } from "./_guard/authenticationGuard";
import { IsLoggedinGuard } from "./_guard/isLoggedinGuard";

const routes: Routes = [
  {
    path: "profile",
    component: StoreProfileComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "medicines-add",
    component: MedicinesAddComponent,
    canActivate: [AuthenticationGuard],
  },

  {
    path: "store-list",
    component: StoreListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "medicines-available",
    component: MedicinesAvailableListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [IsLoggedinGuard],
  },
  {
    path: "**",
    component: MedicinesListComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
