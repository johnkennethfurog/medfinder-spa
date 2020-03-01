import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseResponse } from "../_models/base-response";
import { MedicineAvailable } from "../_models/medicine-available";
import { environment } from "src/environments/environment";
import { MessageResponse } from "../_models/message-response";
import { PayloadMedicineAdd } from "../_models/payload-medicine-add";

@Injectable({ providedIn: "root" })
export class MedicineService {
  medicineUrl = environment.baseUrl + "medicines/";

  constructor(private httpClient: HttpClient) {}

  getAvailableMedicines(): Observable<BaseResponse<MedicineAvailable[]>> {
    return this.httpClient.get<BaseResponse<MedicineAvailable[]>>(
      this.medicineUrl + "all"
    );
  }

  addMedicine(
    medicine: MedicineAvailable
  ): Observable<BaseResponse<MedicineAvailable>> {
    return this.httpClient.post<BaseResponse<MedicineAvailable>>(
      this.medicineUrl,
      medicine
    );
  }

  updateMedicine(
    medicine: MedicineAvailable
  ): Observable<BaseResponse<MedicineAvailable>> {
    return this.httpClient.put<BaseResponse<MedicineAvailable>>(
      this.medicineUrl,
      medicine
    );
  }

  deleteMedicine(
    medicine: MedicineAvailable
  ): Observable<BaseResponse<MedicineAvailable>> {
    return this.httpClient.delete<BaseResponse<MedicineAvailable>>(
      this.medicineUrl + medicine._id
    );
  }
}
