import { CreateDateColumn } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";

export type SettingsType = {
  clear_on_interval: boolean;
  clear_interval?: number;
  age?: number;
  name?: string;
  relationship_status?: RelationshipStatus;
  weight?: number;
  weight_unit_preference?: WeightUnit;
  height?: number;
  height_unit_preference?: HeightUnit;
};


export enum RelationshipStatus {
  single = "Single",
  married = "Married",
  in_a_relationship = "In a relationship",
  dating = "Dating",
  other = "Other",
}

export enum WeightUnit {
  kg = "kg",
  lbs = "lbs",
}

export enum HeightUnit {
  cm = "cm",
  in = "in",
}

@Entity("settings", {})
export class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: "datetime",
    default: () => "current_timestamp",
  })
  updated_at!: Date;

  @Column({ type: "text", default: "Anonymous" })
  name!: string;

  @Column({ type: "integer", default: 0 })
  age!: number;

  @Column({ type: "integer", default: 0 })
  weight!: number;

  @Column({ type: "text", default: "lb" })
  weight_unit_preference!: WeightUnit;

  @Column({ type: "integer", default: 0 })
  height!: number;

  @Column({ type: "text", default: "in" })
  height_unit_preference!: HeightUnit;

  @Column({type: "boolean", default: false})
  clear_on_interval!: boolean;

  @Column({type: "integer", default: 7})
  clear_interval?: number;
}
