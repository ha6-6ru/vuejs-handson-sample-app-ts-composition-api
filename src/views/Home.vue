<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <v-row class="py-12" align="center" justify="center">
        <span class="font-weight-thin title" v-text="`${today.year}/`" />
        <span class="pl-2 display-1" v-text="`${today.month}/${today.day}`" />
        <v-chip
          class="ml-2 pt-0 title"
          color="pink"
          text-color="white"
          v-text="displayWeekday"
        />
      </v-row>
      <div v-for="(event, index) in filteredEvents" :key="index">
        <v-chip
          class="mt-2"
          :color="getEventColor(event)"
          text-color="white"
          label
          v-text="event.name"
        />
      </div>
      <v-divider class="my-4" />
      <v-timeline v-if="displayTimeline" class="mb-12">
        <v-timeline-item
          v-for="(event, index) in filteredEventsHasTime"
          :key="index"
          class="text-left"
          right
          :color="getEventColor(event)"
        >
          <template v-slot:opposite>
            <span v-text="event.startTime" />
          </template>
          <span class="pl-4" v-text="event.name" />
        </v-timeline-item>
      </v-timeline>
      <v-row align="center" justify="center">
        <v-switch
          v-for="(sharedUser, index) in sharedUsers"
          :key="index"
          v-model="sharedUser.display"
          class="ml-4 pt-0"
          :color="sharedUser.themeColor"
          :label="sharedUser.nickname"
          hide-details
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
} from '@vue/composition-api';
import { CalendarEvent } from 'vuetify';
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
import { CalendarEventTodayDetail } from '@/store/calendar-event.model';
import { todayCalendarEventMockData } from '@/store/calendar-event';
import { getThemeColor } from '@/store/shared-user';
import { useSharedEvents } from '@/modules/use-shared-events';

export default defineComponent({
  setup() {
    const { sharedEventState, getDisplayUserIds } = useSharedEvents();
    const state = reactive({
      // 本日の日付です。
      today: parseDate(new Date()),
      // 本日の曜日です。
      displayWeekday: computed((): string => {
        return ['日', '月', '火', '水', '木', '金', '土'][state.today.weekday];
      }),
      /**
       * 時間指定のないイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEvents: computed((): CalendarEventTodayDetail[] => {
        return todayCalendarEventMockData.filter(
          event =>
            getDisplayUserIds().includes(event.userId) && !event.startTime,
        );
      }),
      /**
       * 時間指定のあるイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEventsHasTime: computed((): CalendarEventTodayDetail[] => {
        return todayCalendarEventMockData.filter(
          event =>
            getDisplayUserIds().includes(event.userId) && event.startTime,
        );
      }),
      // タイムラインを表示するかどうかを示す値です。
      displayTimeline: computed((): boolean => {
        return state.filteredEventsHasTime.length > 0;
      }),
    });
    /**
     * イベントの色を取得します。
     */
    const getEventColor = (event: CalendarEvent) => {
      if (!event) {
        return;
      }

      return getThemeColor(event.userId);
    };

    return {
      ...toRefs(sharedEventState),
      ...toRefs(state),
      getEventColor,
    };
  },
});
</script>
