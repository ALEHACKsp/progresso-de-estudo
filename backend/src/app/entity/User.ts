import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Subject } from "./Subject";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(type => Subject, subject => subject.user)
  subjects: Array<Subject>;
}
