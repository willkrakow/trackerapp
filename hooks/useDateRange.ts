import { useState } from "react";
import dayjs from "dayjs";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";

type DateRange = {
  start: Date;
  end: Date;
};
const initial = {
  start: dayjs().subtract(7, "days").toDate(),
  end: dayjs().toDate(),
};
const useDateRange = (initialValue: DateRange = initial) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialValue);

  const handleChangeStartDate = (
    _: DateTimePickerEvent | null,
    date: Date | undefined
  ) => {
    if (date) {
      setDateRange({
        ...dateRange,
        start: date,
      });
    }
  };

  const handleChangeEndDate = (
    _: DateTimePickerEvent | null,
    date: Date | undefined
  ) => {
    if (date) {
      setDateRange({
        ...dateRange,
        end: date,
      });
    }
  };

  const moveRangeBack = (numberOfDays: number) => {
    setDateRange({
      start: dayjs(dateRange.start).subtract(numberOfDays, "days").toDate(),
      end: dayjs(dateRange.end).subtract(numberOfDays, "days").toDate(),
    });
  }

  const moveRangeForward = (numberOfDays: number) => {
    setDateRange({
      start: dayjs(dateRange.start).add(numberOfDays, "days").toDate(),
      end: dayjs(dateRange.end).add(numberOfDays, "days").toDate(),
    });
  }

    return {
        dateRange,
        handleChangeStartDate,
        handleChangeEndDate,
        moveRangeBack,
        moveRangeForward
    };
}


export default useDateRange;