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

  @Column({ type: 'varchar', nullable: true })
  wateringMethod?: string;

  @Column({ type: 'int', nullable: true })
  fertilizingFrequency?: number;

  @Column({ type: 'int', nullable: true })
  fertilizingAmount?: number;

  @Column({ type: 'varchar', nullable: true })
  fertilizingMethod?: string;

  @Column({ type: 'varchar', nullable: true })
  fertilizerType?: string;

  @Column({ type: 'varchar', nullable: true })
  sunlightNeed?: string;

  @Column({ type: 'varchar', nullable: true })
  difficultyLevel?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
