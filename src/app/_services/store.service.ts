import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { BaseResponse } from "../_models/base-response";
import { Medicine } from "../_models/medicine";
import { HttpClient } from "@angular/common/http";
import { Store } from "../_models/store";
import { MessageResponse } from "../_models/message-response";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  storeUrl = environment.baseUrl + "store/";

  constructor(private httpClient: HttpClient) {}

  getMedicines(): Observable<BaseResponse<Store>> {
    return this.httpClient
      .get<BaseResponse<Store>>(
        this.storeUrl + "medicines/" + this.getStoreId()
      )
      .pipe(
        map(rspns => {
          this.setStoreIds(rspns.data.Medicines);

          return rspns;
        })
      );
  }

  addMedicines(medicines: Medicine[]): Observable<MessageResponse> {
    const storeId = this.getStoreId();
    const payload = {
      storeId,
      medicines
    };

    return this.httpClient.post<MessageResponse>(
      this.storeUrl + "medicine/",
      payload
    );
  }

  updateMedicine(medicine: Medicine): Observable<MessageResponse> {
    const storeId = this.getStoreId();
    const payload = {
      storeId,
      medicine
    };

    return this.httpClient.put<MessageResponse>(
      this.storeUrl + "medicine/",
      payload
    );
  }

  removeMedicine(medicine: Medicine): Observable<MessageResponse> {
    const storeId = this.getStoreId();
    return this.httpClient.delete<MessageResponse>(
      `${this.storeUrl}medicine/${storeId}/${medicine.MedicineId}`
    );
  }

  getStoreId(): string {
    return "5e0029d40863b32bc4dc9bc1";
  }

  setStoreIds(medicines: Medicine[]) {
    const medids = medicines.map(x => x.MedicineId);
    localStorage.setItem("medid", JSON.stringify(medids));
  }

  getStoreMedicineIds(): string[] {
    return JSON.parse(localStorage.getItem("medid"));
  }

  getStoreProfile(): Observable<BaseResponse<Store>> {
    const storeId = this.getStoreId();
    return this.httpClient
      .get<BaseResponse<Store>>(this.storeUrl + "profile/" + storeId)
      .pipe(
        map(rspns => {
          this.setStore(rspns.data);
          return rspns;
        })
      );
  }

  updateStoreProfile(store: Store): Observable<BaseResponse<Store>> {
    const storeId = this.getStoreId();
    return this.httpClient
      .put<BaseResponse<Store>>(this.storeUrl + "profile/", store)
      .pipe(
        map(rspns => {
          this.setStore(rspns.data);
          return rspns;
        })
      );
  }

  getStore(): Store {
    return JSON.parse(localStorage.getItem("store"));
  }

  setStore(store: Store) {
    localStorage.setItem("store", JSON.stringify(store));
  }
}
