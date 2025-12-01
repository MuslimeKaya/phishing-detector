import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'malicious_apps' })
export class MaliciousAppEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    packageName: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    sha256: string;

    @Column({ type: 'varchar', length: 100 })
    threatType: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
