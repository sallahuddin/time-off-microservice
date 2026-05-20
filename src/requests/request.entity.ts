import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SYNC_PENDING = 'SYNC_PENDING'
}

@Entity()
export class TimeOffRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  locationId: string;

  @Column('float')
  days: number;

  @Column({
    type: 'varchar',
    default: RequestStatus.PENDING
  })
  status: RequestStatus;

  @Column({ nullable: true })
  externalReference: string;

  @CreateDateColumn()
  createdAt: Date;
}