import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../../domain/repositories/notification.repository";
import { NotificationOrmEntity } from "./notification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "../../domain/entities/notification.entity";

@Injectable()
export class NotificationTypeOrmRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly repo: Repository<NotificationOrmEntity>,
  ) {}

  async save(notification: Notification): Promise<void> {
    const ormEntity = this.repo.create({
      id: notification.id,
      userId: notification.userId,
      message: notification.message,
      type: notification.type,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    });
    await this.repo.save(ormEntity);
  }

  async findByUser(userId: string): Promise<Notification[]> {
    const ormEntities = await this.repo.find({ where: { userId } });
    return ormEntities.map((ormEntity) => {
      return new Notification(
        ormEntity.id,
        ormEntity.userId,
        ormEntity.message,
        ormEntity.type as "user" | "system" | "marketing",
        ormEntity.createdAt,
        ormEntity.readAt
        );
    });
  }

  async markAsRead(id: string) {
    await this.repo.update(id, { readAt: new Date() });
  }
}
