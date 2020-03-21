import { Medicine } from "./medicine";
import { Schedule } from "./schedule";
import { Avatar } from "./avatar";

export interface Store {
  Location: StoreLocation;
  Schedule: Schedule;
  Admin: any[];
  _id: string;
  Name: string;
  Address: string;
  ContactInfo: string;
  IsHealthCentre: boolean;
  Medicines: Medicine[];
  Avatar: Avatar;
  IsAdminAccount: boolean;

  isLoading: boolean;
}

export interface StoreLocation {
  type: string;
  coordinates: number[];
}
