import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm';

@Entity({ name: 'phishing' })
export class PhishingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  url: string;

  @Column()
  source: string;

  @CreateDateColumn()
  createdAt: Date;
}
