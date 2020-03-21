import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/auth.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { Router } from "@angular/router";
import { Validate } from "../../_utils/reactiveFormHelper.js";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signinForm = this.fb.group({
      email: this.fb.control("", Validators.required),
      pass: this.fb.control("", Validators.required)
    });
  }

  signin() {
    if (this.isLoading) {
      return;
    }

    if (this.signinForm.invalid) {
      this.alertifyService.error("Username and password is required");
      Validate(this.signinForm);

      return;
    }

    this.isLoading = true;

    this.authService.signin(this.signinForm.value).subscribe(
      rspns => {
        this.alertifyService.success(rspns.message);
        this.isLoading = false;
        if (this.authService.isAdmin) {
          this.router.navigate(["medicines-available"]);
        } else {
          this.router.navigate(["medicines"]);
        }
      },
      error => {
        this.alertifyService.error(error.error.message);
        this.isLoading = false;
      }
    );
  }
}
