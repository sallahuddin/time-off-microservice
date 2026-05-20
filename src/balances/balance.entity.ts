import { Entity, PrimaryGeneratedColumn, Column, VersionColumn, Index } from 'typeorm';

@Entity()
@Index(['employeeId', 'locationId'], { unique: true })
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  locationId: string;

  @Column({ type: 'float', default: 0 })
  totalBalance: number;

  @Column({ type: 'float', default: 0 })
  reservedBalance: number;

  @VersionColumn()
  version: number;
}