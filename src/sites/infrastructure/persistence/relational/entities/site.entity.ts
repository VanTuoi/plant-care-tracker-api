import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { TemplateSiteEntity } from '../../../../../template-site/infrastructure/persistence/relational/entities/template-site.entity';

@Entity('site')
export class SiteEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  sunlight?: string;

  @Column({ nullable: true })
  lightDuration?: string;

  @Column({ nullable: true })
  lightType?: string;

  @Column({ nullable: true })
  soilMoisture?: string;

  @Column({ nullable: true })
  soilType?: string;

  @Column({ nullable: true })
  phSoil?: string;

  @Column({ type: 'float', nullable: true })
  temperature?: number;

  @Column({ type: 'float', nullable: true })
  humidity?: number;

  @Column({ nullable: true })
  windExposure?: string;

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
}
