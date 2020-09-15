import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Content } from './Content';
import { User } from './User';

@Entity({ name: 'subjects' })
export class Subject {
  @PrimaryColumn()
  id: Number;

  @Column()
  name: String;

  @ManyToOne(type => User, user => user.subjects)
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @OneToMany(type => Content, content => content.subjects)
  contents: Content;
}
