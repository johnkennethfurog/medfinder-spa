import { Medicine } from "./medicine";
import { Schedule } from "./schedule";

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
}

export interface StoreLocation {
  type: string;
  coordinates: number[];
}
