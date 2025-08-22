import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('notifications')
export class NotificationOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  message: string;

  @Column()
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date | null;
}
