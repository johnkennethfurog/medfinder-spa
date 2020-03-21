import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ChangePasswordComponent } from "./_modal/change-password/change-password.component";
import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "medfinder-spa";

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  changePassword() {
    this.dialog.open(ChangePasswordComponent, { width: "520px" });
  }

  get _isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  get _isSignedIn(): boolean {
    return this.authService.isSignedIn;
  }

  get _usersEmail(): string {
    return this.authService.usersEmail;
  }

  gotoHome() {
    if (this._isSignedIn) {
      if (!this._isAdmin) {
        this.router.navigate(["/home"]);
      } else {
        this.router.navigate(["/medicines-available"]);
      }
    }
  }

  signout() {
    this.alertify.confirm(
      "Sign out",
      "Are you sure you want to signout?",
      () => {
        this.authService.signout();
        this.router.navigate(["sign-in"]);
      }
    );
  }
}
