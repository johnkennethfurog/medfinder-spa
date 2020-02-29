import { Medicine } from "./medicine";

export interface PayloadMedicineAdd {
  storeId: string;
  medicinesData: Medicine[];
}
