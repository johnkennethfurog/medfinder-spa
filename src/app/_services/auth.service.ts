import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageResponse } from "../_models/message-response";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PayloadChangePassword } from "../_models/payload-change-password";
import { PayloadSignin } from "../_models/payload-signin";
import { BaseResponse } from "../_models/base-response";
import { map } from "rxjs/operators";
import { Token } from "../_models/token";

@Injectable({ providedIn: "root" })
export class AuthService {
  storeUrl = environment.baseUrl + "users/";

  constructor(private httpClient: HttpClient) {}

  get isSignedIn(): boolean {
    return localStorage.getItem("token") !== null;
  }

  changePassword(payload: PayloadChangePassword): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(
      this.storeUrl + "changepassword",
      payload
    );
  }

  get isAdmin() {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin) {
      return JSON.parse(isAdmin);
    } else {
      return false;
    }
  }

  get usersEmail() {
    return localStorage.getItem("email");
  }

  signin(payload: PayloadSignin): Observable<BaseResponse<Token>> {
    return this.httpClient
      .post<BaseResponse<Token>>(this.storeUrl + "signin", payload)
      .pipe(
        map(rspns => {
          const { IsAdminAccount } = rspns.data.user;

          localStorage.setItem("isAdmin", JSON.stringify(IsAdminAccount));
          localStorage.setItem("token", rspns.data.authToken);
          localStorage.setItem("email", rspns.data.user.Email);
          return rspns;
        })
      );
  }

  getStoredAccessToken() {
    return localStorage.getItem("token");
  }

  signout() {
    localStorage.clear();
  }
}
