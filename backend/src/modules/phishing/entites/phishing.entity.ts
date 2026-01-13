import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'verified_online' })
export class PhishingEntity {
  @PrimaryColumn({ name: 'phish_id', type: 'integer' })
  id: number;

  @Column()
  url: string;

  @Column({ name: 'phish_detail_url', nullable: true })
  phishDetailUrl: string;

  @Column({ name: 'submission_time', nullable: true })
  submissionTime: string;

  @Column({ nullable: true })
  verified: string;

  @Column({ name: 'verification_time', nullable: true })
  verificationTime: string;

  @Column({ nullable: true })
  online: string;

  @Column({ nullable: true })
  target: string;
}
