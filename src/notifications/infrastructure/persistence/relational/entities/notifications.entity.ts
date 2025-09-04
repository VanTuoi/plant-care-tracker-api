import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { NotificationTypeEnum } from '../../../../notification.enum';

@Entity({ name: 'notification' })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({
    type: 'enum',
    enum: NotificationTypeEnum,
    nullable: true,
  })
  type?: NotificationTypeEnum;

  @Column({ type: 'text', nullable: true })
  payload?: string;

  @Column({ type: 'varchar', nullable: true })
  url?: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean = false;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, { eager: true })
  @Index()
  user: UserEntity;

  @ManyToOne(() => PlantEntity, { nullable: true, eager: true })
  @Index()
  plant?: PlantEntity;
}
