import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Subject } from './Subject';

@Entity({ name: 'contents' })
export class Content {
  @PrimaryColumn()
  id: Number;

  @Column()
  name: String;

  @Column()
  check: Boolean;

  @Column()
  anotation: String;

  @Column()
  totalQuestions: Number;

  @Column()
  totalHits: Number;

  @Column()
  totalErros: Number;

  @Column()
  totalQuestionsAnswered: Number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @ManyToOne(type => Subject, subject => subject.contents)
  subjects: Array<Subject>;
}
