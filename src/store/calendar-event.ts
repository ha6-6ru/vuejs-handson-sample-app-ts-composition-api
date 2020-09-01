import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import {
  CalendarEventDetail,
  CalendarEventTodayDetail,
  NewCalendarEvent,
} from '@/store/calendar-event.model';
import { profileStore } from '@/store/profile/profile';

export const calendarEventMockData: CalendarEventDetail[] = [
  {
    id: 'a8b2c7c8-ebe4-4c70-a1d0-dbc42ba777d5',
    userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
    name: '休み',
    start: '2020-03-02',
    end: '2020-03-03',
    memo: null,
    shared: true,
  },
  {
    id: 'cf41ab17-3674-42aa-a182-9609e10c02a2',
    userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
    name: '音楽発表会',
    start: '2020-03-03 09:00',
    end: '2020-03-03 12:00',
    memo: '小学校',
    shared: true,
  },
  {
    id: 'dbab8f98-6439-43b7-b8f0-c96b62b72679',
    userId: '2ec8d984-aa5f-4f7e-b1a8-c9e478b54ffe',
    name: 'ショッピング',
    start: '2020-03-02 13:00',
    end: '2020-03-02 16:00',
    memo: null,
    shared: true,
  },
  {
    id: 'd5be8374-b82e-4417-99ad-bde160b85b71',
    userId: '2ec8d984-aa5f-4f7e-b1a8-c9e478b54ffe',
    name: '音楽発表会',
    start: '2020-03-03 09:00',
    end: '2020-03-03 12:00',
    memo: null,
    shared: true,
  },
  {
    id: '5e061dd1-6fc7-47f1-9d8c-ebc0eb405e15',
    userId: '74ecde04-e90a-4b8a-ad3e-aa4dffac6127',
    name: '早帰り',
    start: '2020-03-02 12:00',
    end: '2020-03-02 13:00',
    memo: null,
    shared: true,
  },
  {
    id: 'a6f077d1-8df8-40e1-8749-d5a09fc81003',
    userId: '74ecde04-e90a-4b8a-ad3e-aa4dffac6127',
    name: '音楽発表会',
    start: '2020-03-03 09:00',
    end: '2020-03-03 12:00',
    memo: null,
    shared: true,
  },
  {
    id: '456d3a82-3cd3-45f0-9df1-5dbc707d35d7',
    userId: '58e4eb36-2be9-4448-b7f9-4603fd1fd026',
    name: '早帰り',
    start: '2020-03-02 12:00',
    end: '2020-03-02 13:00',
    memo: null,
    shared: true,
  },
  {
    id: 'a333a670-c22e-4db6-a855-031564fc2f5d',
    userId: '58e4eb36-2be9-4448-b7f9-4603fd1fd026',
    name: '大会',
    start: '2020-03-07 10:00',
    end: '2020-03-07 12:00',
    memo: null,
    shared: true,
  },
];

export const todayCalendarEventMockData: CalendarEventTodayDetail[] = [
  {
    id: 'a8b2c7c8-ebe4-4c70-a1d0-dbc42ba777d5',
    userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
    name: '休み',
    startTime: null,
    endTime: null,
    memo: null,
    shared: true,
  },
  {
    id: '5e061dd1-6fc7-47f1-9d8c-ebc0eb405e15',
    userId: '74ecde04-e90a-4b8a-ad3e-aa4dffac6127',
    name: '早帰り',
    startTime: '12:00',
    endTime: '13:00',
    memo: null,
    shared: true,
  },
  {
    id: '456d3a82-3cd3-45f0-9df1-5dbc707d35d7',
    userId: '58e4eb36-2be9-4448-b7f9-4603fd1fd026',
    name: '早帰り',
    startTime: '12:00',
    endTime: '13:00',
    memo: null,
    shared: true,
  },
  {
    id: 'dbab8f98-6439-43b7-b8f0-c96b62b72679',
    userId: '2ec8d984-aa5f-4f7e-b1a8-c9e478b54ffe',
    name: 'ショッピング',
    startTime: '13:00',
    endTime: '16:00',
    memo: null,
    shared: true,
  },
];

export const calendarEventStore = reactive({
  calendarEvents: calendarEventMockData,
});

/**
 * UUIDを生成します。
 */
const generateUuidMock = () => {
  return 'a8b2c7c8-ebe4-4c70-a1d0-xxxxxxxxxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16),
  );
};

/**
 * カレンダーイベントを追加します。
 * @param newCalendarEvent 追加するカレンダーイベント
 */
export const add = (newCalendarEvent: NewCalendarEvent) => {
  newCalendarEvent.id = generateUuidMock();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  newCalendarEvent.userId = profileStore.getProfile!.userId;
  calendarEventStore.calendarEvents.push(
    newCalendarEvent as CalendarEventDetail,
  );
};

/**
 * カレンダーイベントを更新します。
 * @param newCalendarEvent 更新するカレンダーイベント
 */
export const update = (newCalendarEvent: NewCalendarEvent) => {
  const index = calendarEventStore.calendarEvents.findIndex(
    event => event.id === newCalendarEvent.id,
  );

  if (index === -1) {
    // 更新対象が見つからなかった場合
    return;
  }

  // https://jp.vuejs.org/v2/guide/list.html#配列の変化を検出
  calendarEventStore.calendarEvents.splice(
    index,
    1,
    newCalendarEvent as CalendarEventDetail,
  );
};
