import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import PasswordUtil from "../../util/PassowordUtil";
import { Subject } from "./Subject";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column({ unique: true })
  email: String;

  @Column()
  password: String;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: String;

  @OneToMany(type => Subject, subject => subject.user)
  subjects: Array<Subject>;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = PasswordUtil.hashPassoword(this.password);
  }
}
