import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from './Content';
import { User } from './User';

@Entity({ name: 'subjects' })
export class Subject {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @ManyToOne(type => User, user => user.subjects, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @OneToMany(type => Content, content => content.subject, { onDelete: 'CASCADE' })
  contents: Content;
}
