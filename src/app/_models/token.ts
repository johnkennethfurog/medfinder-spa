import { Store } from "./store";

export interface Token {
  authToken: string;
  user: User;
}

export interface User {
  Email: string;
  IsAdminAccount: boolean;
  Store: string;
  IsHealthCentre: boolean;
}
