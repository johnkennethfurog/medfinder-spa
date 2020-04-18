import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root",
})
export class IsLoggedinGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isSignedIn) {
      return true;
    } else {
      if (this.authService.isAdmin) {
        this.router.navigate(["medicines-available"]);
      } else {
        this.router.navigate(["medicines"]);
      }
    }
  }
}
