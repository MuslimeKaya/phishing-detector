import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'phishing' })
export class PhishingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  url: string;

  @Index()
  @Column()
  source: string;

  // @Index()
  // @Column()
  // target: string;

  @CreateDateColumn()
  createdAt: Date;
}
