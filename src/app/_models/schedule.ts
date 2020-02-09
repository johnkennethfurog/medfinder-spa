export interface Schedule {
  mon: ScheduleTime;
  tue: ScheduleTime;
  wed: ScheduleTime;
  thu: ScheduleTime;
  fri: ScheduleTime;
  sat: ScheduleTime;
  sun: ScheduleTime;
}

export interface ScheduleTime {
  From: string;
  To: string;
}
