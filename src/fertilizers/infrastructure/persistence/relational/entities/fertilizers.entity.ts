import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../../../fertilizers.enum';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';

@Entity('fertilizer')
export class FertilizerEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({
    type: 'enum',
    enum: FertilizerTypeEnum,
  })
  fertilizerType: FertilizerTypeEnum;

  @Column({ type: 'int' })
  amount: number;

  @Column({
    type: 'enum',
    enum: FertilizerMethodEnum,
  })
  method: FertilizerMethodEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => PlantEntity, {
    eager: true,
  })
  plant: PlantEntity;
}
