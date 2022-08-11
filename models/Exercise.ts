import AsyncStorage from "@react-native-async-storage/async-storage";
// import { secureGetData as getData, secureSaveData as saveData } from "../utils/encryption";
import * as SQLite from "expo-sqlite";
import { Model } from "./model";

type ExerciseType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  created_at: Date;
  intensity: number;
};


export class Exercise extends Model<ExerciseType> {
    id: string;
    title: string;
    description: string;
    duration: number;
    created_at: Date;
    intensity: number;

    constructor(id: string, title: string, description: string, duration: number, created_at: Date, intensity: number) {
        super('exercises');
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.created_at = created_at;
        this.intensity = intensity;
    }

    get data() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            duration: this.duration,
            created_at: this.created_at.toISOString(),
            intensity: this.intensity
        };
    }
}


