import { Injectable } from "@nestjs/common";
import { SendNotificationUseCase } from "../use-cases/send-notification.usecase";

@Injectable()
export class NotificationService {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  async send(userId: string, message: string, type: string) {
    return this.sendNotificationUseCase.execute(userId, message, type);
  }
}
