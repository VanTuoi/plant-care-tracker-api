import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { WaterEnum } from '../../../../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../../../../fertilizers/fertilizers.enum';
import {
  DifficultyLevelEnum,
  SunlightNeedEnum,
} from '../../../../species.enum';

@Entity('species')
export class SpeciesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @Index()
  @Column()
  scientificName: string;

  @ManyToOne(() => FileEntity, { nullable: true, eager: true })
  image?: FileEntity | null;

  @Column({ type: 'int', nullable: true })
  wateringFrequency?: number;

  @Column({ type: 'int', nullable: true })
  wateringAmount?: number;

  @Column({ type: 'enum', enum: WaterEnum, nullable: true })
  wateringMethod?: WaterEnum;

  @Column({ type: 'int', nullable: true })
  fertilizingFrequency?: number;

  @Column({ type: 'int', nullable: true })
  fertilizingAmount?: number;

  @Column({ type: 'enum', enum: FertilizerMethodEnum, nullable: true })
  fertilizingMethod?: FertilizerMethodEnum;

  @Column({ type: 'enum', enum: FertilizerTypeEnum, nullable: true })
  fertilizerType?: FertilizerTypeEnum;

  @Column({ type: 'enum', enum: SunlightNeedEnum, nullable: true })
  sunlightNeed?: SunlightNeedEnum;

  @Column({ type: 'enum', enum: DifficultyLevelEnum, nullable: true })
  difficultyLevel?: DifficultyLevelEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
