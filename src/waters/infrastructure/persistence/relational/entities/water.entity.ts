import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { WaterEnum, WaterStatusEnum } from '../../../../waters.enum';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';

@Entity('water')
export class WaterEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'enum', enum: WaterEnum })
  method: WaterEnum;

  @Column({
    type: 'enum',
    enum: WaterStatusEnum,
    default: WaterStatusEnum.SCHEDULED,
  })
  status: WaterStatusEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => PlantEntity, {
    eager: true,
  })
  plant: PlantEntity;
}
