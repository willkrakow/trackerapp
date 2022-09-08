import dayjs from "dayjs";
import { Record } from "./record";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const DATA_START_DATE = dayjs("2022-08-22");
export const recordsSeed: QueryDeepPartialEntity<Record>[] = [
  {
    record_date: DATA_START_DATE.subtract(7, "days").toDate(),
    acne: true,
    cramping: true,
    on_period: true,
    mood: 4,
    libido: 4,
  },
  {
    record_date: DATA_START_DATE.subtract(6, "days").toDate(),
    acne: true,
    cramping: false,
    on_period: true,
    mood: 3,
    libido: 3,
  },
  {
    record_date: DATA_START_DATE.subtract(5, "days").toDate(),
    acne: true,
    cramping: true,
    on_period: true,
    mood: 5,
    libido: 5,
  },
  {
    record_date: DATA_START_DATE.subtract(4, "days").toDate(),
    acne: true,
    cramping: true,
    on_period: true,
    mood: 2,
    libido: 2,
  },
  {
    record_date: DATA_START_DATE.subtract(3, "days").toDate(),
    acne: false,
    cramping: true,
    on_period: false,
    mood: 4,
    libido: 4,
  },
  {
    record_date: DATA_START_DATE.subtract(2, "days").toDate(),
    acne: false,
    cramping: true,
    on_period: false,
    mood: 3,
    libido: 3,
  },
  {
    record_date: DATA_START_DATE.subtract(3, "days").toDate(),
    acne: false,
    cramping: true,
    on_period: false,
    mood: 5,
    libido: 2,
  },
];
