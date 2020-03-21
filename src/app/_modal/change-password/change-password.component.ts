import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from "src/app/_services/auth.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { StoreService } from "src/app/_services/store.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;

  isLoading = false;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder,
    private alertify: AlertifyService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.changePassForm = this.fb.group({
      oldPass: this.fb.control("", Validators.required),
      newPass: this.fb.control("", Validators.required),
      confirmPass: this.fb.control("", Validators.required)
    });
  }

  ngOnInit() {}

  save() {
    const { oldPass, newPass, confirmPass } = this.changePassForm.value;

    if (this.isLoading) {
      return;
    }

    if (this.changePassForm.invalid) {
      this.alertify.error("All fields are required");
      return;
    }

    if (newPass !== confirmPass) {
      this.alertify.error("Password does not match");
      return;
    }

    this.isLoading = true;

    this.authService
      .changePassword({ password: newPass, oldPassword: oldPass })
      .subscribe(
        rspns => {
          this.alertify.success("Password changed");
          this.isLoading = false;
          this.dialogRef.close();
        },
        error => {
          this.alertify.error(error.error.message);
          this.isLoading = false;
        }
      );
  }
}
