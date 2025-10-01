import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { TemplateSiteEntity } from '../../../../../template-sites/infrastructure/persistence/relational/entities/template-sites.entity';
import {
  Sunlight,
  LightType,
  SoilType,
} from '../../../../../template-sites/template-sites.enum';

@Entity('site')
export class SiteEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: Sunlight,
    default: Sunlight.UNKNOWN,
    nullable: true,
  })
  sunlight?: Sunlight;

  @Column({ type: 'float', nullable: true })
  lightDuration?: number;

  @Column({
    type: 'enum',
    enum: LightType,
    default: LightType.UNKNOWN,
    nullable: true,
  })
  lightType?: LightType;

  @Column({ type: 'float', nullable: true })
  soilMoisture?: number;

  @Column({
    type: 'enum',
    enum: SoilType,
    default: SoilType.UNKNOWN,
    nullable: true,
  })
  soilType?: SoilType;

  @Column({ type: 'float', nullable: true })
  phSoil?: number;

  @Column({ type: 'float', nullable: true })
  temperature?: number;

  @Column({ type: 'float', nullable: true })
  humidity?: number;

  @Column({ type: 'float', nullable: true })
  windExposure?: number;

  @Column({ type: 'float', nullable: true })
  latitude?: number;

  @Column({ type: 'float', nullable: true })
  longitude?: number;

  @Column({ type: 'float', nullable: true })
  altitude?: number;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToOne(() => TemplateSiteEntity, { eager: true, nullable: true })
  template?: TemplateSiteEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
