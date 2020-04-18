import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isSignedIn) {
      return true;
    } else {
      this.router.navigate(["sign-in"]);
    }
  }
}
