import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { BaseResponse } from "../_models/base-response";
import { Medicine } from "../_models/medicine";
import { HttpClient } from "@angular/common/http";
import { Store } from "../_models/store";
import { MessageResponse } from "../_models/message-response";
import { map } from "rxjs/operators";
import { Avatar } from "../_models/avatar";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  storeUrl = environment.baseUrl + "store/";

  constructor(private httpClient: HttpClient) {}

  getMedicines(): Observable<BaseResponse<Store>> {
    return this.httpClient
      .get<BaseResponse<Store>>(this.storeUrl + "medicines/")
      .pipe(
        map(rspns => {
          this.setStoreIds(rspns.data.Medicines);

          return rspns;
        })
      );
  }

  addMedicines(medicines: Medicine[]): Observable<MessageResponse> {
    const payload = {
      medicines
    };

    return this.httpClient.post<MessageResponse>(
      this.storeUrl + "medicine/",
      payload
    );
  }

  updateMedicine(medicine: Medicine): Observable<MessageResponse> {
    const payload = {
      medicine
    };

    return this.httpClient.put<MessageResponse>(
      this.storeUrl + "medicine/",
      payload
    );
  }

  removeMedicine(medicine: Medicine): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(
      `${this.storeUrl}medicine/${medicine.MedicineId}`
    );
  }

  setStoreIds(medicines: Medicine[]) {
    const medids = medicines.map(x => x.MedicineId);
    localStorage.setItem("medid", JSON.stringify(medids));
  }

  getStoreMedicineIds(): string[] {
    return JSON.parse(localStorage.getItem("medid"));
  }

  getStoreProfile(): Observable<BaseResponse<Store>> {
    return this.httpClient
      .get<BaseResponse<Store>>(this.storeUrl + "profile/")
      .pipe(
        map(rspns => {
          this.setStore(rspns.data);
          return rspns;
        })
      );
  }

  updateStoreProfile(store: Store): Observable<BaseResponse<Store>> {
    return this.httpClient
      .put<BaseResponse<Store>>(this.storeUrl + "profile/", store)
      .pipe(
        map(rspns => {
          this.setStore(rspns.data);
          return rspns;
        })
      );
  }

  uploadAvatar(file: File, publicId: string): Observable<BaseResponse<Avatar>> {
    const formData = new FormData();

    formData.append("photo", file);
    if (publicId) {
      formData.append("public_id", publicId);
    }
    return this.httpClient.post<BaseResponse<Avatar>>(
      this.storeUrl + "avatar",
      formData
    );
  }

  getStore(): Store {
    return JSON.parse(localStorage.getItem("store"));
  }

  setStore(store: Store) {
    localStorage.setItem("store", JSON.stringify(store));
  }

  getStores(): Observable<BaseResponse<Store[]>> {
    return this.httpClient.get<BaseResponse<Store[]>>(this.storeUrl);
  }

  registerStore(payload): Observable<BaseResponse<Store>> {
    return this.httpClient.post<BaseResponse<Store>>(
      this.storeUrl + "add",
      payload
    );
  }

  resetPassword(storeId: string): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(
      this.storeUrl + "resetpassword",
      {
        storeId
      }
    );
  }
}
