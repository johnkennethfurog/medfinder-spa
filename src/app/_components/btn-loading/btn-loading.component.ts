import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-btn-loading",
  templateUrl: "./btn-loading.component.html",
  styleUrls: ["./btn-loading.component.css"]
})
export class BtnLoadingComponent {
  @Input() Text = "OK";
  @Input() IsLoading = false;
  @Output() clicked = new EventEmitter();

  constructor() {}

  btnClick() {
    this.clicked.emit();
  }
}
