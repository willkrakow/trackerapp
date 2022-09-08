import { CreateDateColumn } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm/browser";

@Entity("record")
export class Record {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: "datetime",
    default: () => "current_timestamp",
  })
  created_at!: Date;

  @CreateDateColumn({
    type: "datetime",
    default: () => "current_timestamp",
  })
  updated_at!: Date;

  @Column({
    type: "datetime",
    default: () => "current_timestamp",
  })
  record_date!: Date;

  @Column("boolean", { default: false })
  on_period!: boolean;

  @Column("boolean", { default: false })
  cramping!: boolean;

  @Column("boolean")
  acne!: boolean;

  @Column("integer")
  cramping_side?: number;

  @Column("integer")
  mood?: number;

  @Column("integer")
  libido?: number;

  @Column("integer")
  bloating?: number;

  @Column("integer")
  flow_level?: number;
}
