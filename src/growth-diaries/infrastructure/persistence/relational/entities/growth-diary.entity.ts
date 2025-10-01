import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { Mood } from '../../../../growth-diaries.enum';

@Entity({ name: 'growth_diary' })
export class GrowthDiaryEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  plantId: string;

  @ManyToOne(() => PlantEntity)
  plant: PlantEntity;

  @Column('uuid', { nullable: true })
  fileId?: string;

  @OneToOne(() => FileEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'fileId' })
  file?: FileEntity;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'enum', enum: Mood, nullable: true })
  mood?: Mood;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
