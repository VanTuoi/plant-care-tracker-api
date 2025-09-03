import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { WaterEnum } from '../../../../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../../../../fertilizers/fertilizers.enum';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SpeciesEntity } from '../../../../../species/infrastructure/persistence/relational/entities/species.entity';
import { SiteEntity } from '../../../../../sites/infrastructure/persistence/relational/entities/site.entity';
import {
  DifficultyLevelEnum,
  SunlightNeedEnum,
} from '../../../../../species/species.enum';
import { PlantSizeEnum } from '../../../../plant.enum';
import { PlantImageEntity } from '../../../../../plant-image/infrastructure/persistence/relational/entities/plant-image.entity';

@Entity({ name: 'plant' })
export class PlantEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  scientificName?: string;

  @Column({
    type: 'enum',
    enum: PlantSizeEnum,
    nullable: true,
  })
  size?: PlantSizeEnum;

  @Column({
    type: 'boolean',
    default: true,
  })
  inGround: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDead: boolean;

  @Column({ type: 'int', nullable: true })
  wateringFrequency?: number;

  @Column({ type: 'int', nullable: true })
  wateringAmount?: number;

  @Column({
    type: 'enum',
    enum: WaterEnum,
    nullable: true,
  })
  wateringMethod?: WaterEnum;

  @Column({ type: 'int', nullable: true })
  fertilizingFrequency?: number;

  @Column({ type: 'int', nullable: true })
  fertilizingAmount?: number;

  @Column({
    type: 'enum',
    enum: FertilizerMethodEnum,
    nullable: true,
  })
  fertilizingMethod?: FertilizerMethodEnum;

  @Column({
    type: 'enum',
    enum: FertilizerTypeEnum,
    nullable: true,
  })
  fertilizerType?: FertilizerTypeEnum;

  @Column({
    type: 'enum',
    enum: SunlightNeedEnum,
    nullable: true,
  })
  sunlightNeed?: SunlightNeedEnum;

  @Column({
    type: 'enum',
    enum: DifficultyLevelEnum,
    nullable: true,
  })
  difficultyLevel?: DifficultyLevelEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(() => SpeciesEntity, { eager: true })
  @Index()
  species?: SpeciesEntity;

  @OneToMany(() => PlantImageEntity, (image) => image.plant, { eager: true })
  images?: PlantImageEntity[];

  @ManyToOne(() => UserEntity, { eager: true })
  @Index()
  user?: UserEntity;

  @ManyToOne(() => SiteEntity, { eager: true })
  @Index()
  site?: SiteEntity;
}
