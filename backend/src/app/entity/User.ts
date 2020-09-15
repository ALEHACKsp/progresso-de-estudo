import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Subject } from "./Subject";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @OneToMany(type => Subject, subject => subject.user)
  subjects: Array<Subject>;
}
