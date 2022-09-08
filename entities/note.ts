import { CreateDateColumn } from "typeorm";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm/browser";

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  title!: string;

  @Column("text")
  text!: string;

  @CreateDateColumn({
    type: "datetime",
    default: () => "current_timestamp",
  })
  created_at!: Date;
}
