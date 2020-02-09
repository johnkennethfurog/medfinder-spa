import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-schedule-time",
  templateUrl: "./schedule-time.component.html",
  styleUrls: ["./schedule-time.component.css"]
})
export class ScheduleTimeComponent implements OnInit {
  @Input() timeGroup: FormGroup;
  @Input() day: string;
  constructor() {}

  ngOnInit() {}
}
