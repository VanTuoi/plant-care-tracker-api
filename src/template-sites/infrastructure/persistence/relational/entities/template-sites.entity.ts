import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { LightType, SoilType, Sunlight } from '../../../../template-sites.enum';

@Entity({ name: 'template_site' })
export class TemplateSiteEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: Sunlight, default: Sunlight.UNKNOWN })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
