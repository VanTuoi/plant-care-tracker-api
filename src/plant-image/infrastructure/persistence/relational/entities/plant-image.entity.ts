import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

@Entity({ name: 'plant_image' })
export class PlantImageEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  plantId: string;

  @ManyToOne(() => PlantEntity)
  plant: PlantEntity;

  @Column('uuid')
  fileId: string;

  @ManyToOne(() => FileEntity, { eager: true })
  file: FileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
