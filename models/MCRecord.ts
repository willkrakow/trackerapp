import AsyncStorage from "@react-native-async-storage/async-storage";
// import { secureGetData as getData, secureSaveData as saveData } from "../utils/encryption";
import * as SQLite from "expo-sqlite";
import { Model } from "./model";

export type MCRecordType = {
  id: string;
  created_at: Date;
  cramping: boolean;
  acne: boolean;
  on_period: boolean;
};

export class MCRecord extends Model<MCRecordType> {
  id: string;
  created_at: Date;
  cramping: boolean;
  acne: boolean;
  on_period: boolean;

  constructor(
    id: string,
  created_at: Date,
  cramping: boolean,
  acne: boolean,
  on_period: boolean,
  ) {
    super("symptoms");
    this.id = id;
    this.created_at = created_at;
    this.cramping = cramping;
    this.acne = acne;
    this.on_period = on_period;
  }

  get data() {
    return {
      id: this.id,
      acne: this.acne,
      cramping: this.cramping,
      on_period: this.on_period,
      created_at: this.created_at.toISOString(),
    };
  }
}
