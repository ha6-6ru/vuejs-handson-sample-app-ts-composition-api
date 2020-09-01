interface CalendarEventDetailBase {
  id: string;
  userId: string;
  name: string;
  memo: string | null;
  shared: boolean;
}

export interface CalendarEventDetail extends CalendarEventDetailBase {
  start: string;
  end: string | null;
}

export interface CalendarEventTodayDetail extends CalendarEventDetailBase {
  startTime: string | null;
  endTime: string | null;
}

export interface NewCalendarEvent {
  id: string | null;
  userId: string | null;
  name: string | null;
  start: string;
  end: string | null;
  memo: string | null;
  shared: boolean;
}
