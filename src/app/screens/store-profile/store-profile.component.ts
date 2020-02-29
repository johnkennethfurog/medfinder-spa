import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DARK_THEME } from "../../_utils/dark-theme.js";
import { StoreService } from "src/app/_services/store.service.js";
import { Store } from "src/app/_models/store.js";
import { ScheduleTime } from "src/app/_models/schedule.js";

@Component({
  selector: "app-store-profile",
  templateUrl: "./store-profile.component.html",
  styleUrls: ["./store-profile.component.css"]
})
export class StoreProfileComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  store: Store;
  imgURL: any = "../../../assets/images/placeholder.png";
  selectedFile: File;

  isLoading = false;
  isGettingCoordinates = false;
  selectedMarker: google.maps.Marker;

  map: google.maps.Map;
  address = "";
  name = "";

  santarRosaCoordinates = new google.maps.LatLng(14.276039, 121.094914);
  mapOption: google.maps.MapOptions = {
    center: this.santarRosaCoordinates,
    zoom: 13,
    styles: DARK_THEME,
    disableDefaultUI: true
  };

  markers: google.maps.Marker[] = [];
  storeProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.initializeForm();
    this.fetchProfile();
  }

  fetchProfile() {
    this.storeService.getStoreProfile().subscribe(
      rspns => {
        this.store = rspns.data;
        this.setFormValue();
      },
      error => {}
    );
  }

  initializeForm() {
    this.storeProfileForm = this.fb.group({
      _id: this.fb.control(""),
      Name: this.fb.control("", Validators.required),
      Address: this.fb.control("", Validators.required),
      Location: this.fb.control({}, Validators.required),
      Avatar: this.fb.control(""),
      ContactInfo: this.fb.control(""),
      Schedule: this.fb.group({
        mon: this.addScheduleTime({ From: "", To: "" }),
        tue: this.addScheduleTime({ From: "", To: "" }),
        wed: this.addScheduleTime({ From: "", To: "" }),
        thu: this.addScheduleTime({ From: "", To: "" }),
        fri: this.addScheduleTime({ From: "", To: "" }),
        sat: this.addScheduleTime({ From: "", To: "" }),
        sun: this.addScheduleTime({ From: "", To: "" })
      })
    });
  }

  get _scheduleForm() {
    return this.storeProfileForm.get("Schedule") as FormGroup;
  }

  setFormValue() {
    const storeLocation = new google.maps.LatLng(
      this.store.Location.coordinates[1],
      this.store.Location.coordinates[0]
    );

    this.storeProfileForm.get("_id").setValue(this.store._id);
    this.storeProfileForm.get("Name").setValue(this.store.Name);
    this.storeProfileForm.get("Address").setValue(this.store.Address);
    this.storeProfileForm.get("Location").setValue(this.store.Location);
    this.storeProfileForm.get("ContactInfo").setValue(this.store.ContactInfo);
    this.storeProfileForm.get("Avatar").setValue("");

    this._getScheduleForm.get("mon").setValue(this.store.Schedule.mon);
    this._getScheduleForm.get("tue").setValue(this.store.Schedule.tue);
    this._getScheduleForm.get("wed").setValue(this.store.Schedule.wed);
    this._getScheduleForm.get("thu").setValue(this.store.Schedule.thu);
    this._getScheduleForm.get("fri").setValue(this.store.Schedule.fri);
    this._getScheduleForm.get("sat").setValue(this.store.Schedule.sat);
    this._getScheduleForm.get("sun").setValue(this.store.Schedule.sun);

    this.setLocationSelected(storeLocation);

    console.log("this.storeProfileForm", this.storeProfileForm.value);
  }

  _getDayForm(day): FormGroup {
    return this._getScheduleForm.get(day) as FormGroup;
  }

  addScheduleTime(scheedule: ScheduleTime): FormGroup {
    return this.fb.group({
      From: this.fb.control(scheedule.From),
      To: this.fb.control(scheedule.To)
    });
  }

  get _getScheduleForm(): FormGroup {
    return this.storeProfileForm.get("Schedule") as FormGroup;
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOption);

    // add marker
    // const marker = new google.maps.Marker({
    //   map: this.map,
    //   // icon: image,
    //   title: "Santa Rosa Laguna",
    //   position: this.santarRosaCoordinates
    // });

    // add radius
    // const cityCircle = new google.maps.Circle({
    //   strokeColor: "#FF0000",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.35,
    //   map: this.map,
    //   center: this.santarRosaCoordinates,
    //   radius: 6000
    // });

    // click event
    this.map.addListener("click", e => {
      this.setLocationSelected(e.latLng);
    });
  }

  setLocationSelected(latLng) {
    if (this.selectedMarker) {
      this.locationSelected(latLng);
    } else {
      this.initializeSelectedMarker(latLng);
    }
  }

  initializeSelectedMarker(location) {
    const markerIcon = this.createMarkerIcon("current_location.png");

    this.selectedMarker = new google.maps.Marker({
      map: this.map,
      icon: markerIcon,
      title: "This is your store",
      position: location,
      animation: google.maps.Animation.BOUNCE
    });

    this.locationSelected(location);
  }

  locationSelected(location: google.maps.LatLng) {
    this.storeProfileForm.get("Location").setValue({
      type: "Point",
      coordinates: [location.lng(), location.lat()]
    });
    this.map.setZoom(15);
    this.map.setCenter(location);
    this.selectedMarker.setPosition(location);
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  geoCodeAddress() {
    if (this.isGettingCoordinates) {
      return;
    }

    // clear markers
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    const name = this.storeProfileForm.get("Name").value;
    const keyword = this.storeProfileForm.get("Address").value;
    const placeRequest: google.maps.places.PlaceSearchRequest = {
      name,
      keyword,
      location: this.santarRosaCoordinates,
      radius: 5000,
      type: "drugstore"
    };

    const service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(placeRequest, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.createMarkers(results);
        console.log(results);
      }
    });
  }

  createMarkers(places) {
    const bounds = new google.maps.LatLngBounds();
    places.map(place => {
      const markerIcon = this.createMarkerIcon("store.png");

      const marker = new google.maps.Marker({
        map: this.map,
        icon: markerIcon,
        title: place.name,
        position: place.geometry.location
      });

      marker.addListener("click", e => {
        this.setLocationSelected(marker.getPosition());
        //        this.locationSelected(marker.getPosition());
      });

      this.markers.push(marker);

      bounds.extend(place.geometry.location);
    });

    this.map.fitBounds(bounds);
  }

  createMarkerIcon(fileName: string) {
    return {
      url: `../../../assets/images/${fileName}`,
      size: new google.maps.Size(75, 75),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(50, 50)
    };
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.selectedFile = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = evnt => {
      this.imgURL = reader.result;
    };
  }

  save() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.storeService.updateStoreProfile(this.storeProfileForm.value).subscribe(
      rspns => {
        this.isLoading = false;
      },
      error => {
        console.log("error", error);
        this.isLoading = false;
      }
    );

    console.log(this.storeProfileForm.value);
  }
}
