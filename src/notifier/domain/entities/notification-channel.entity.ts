import { NotificationChannelStatus } from '../../constants/notifier.constants';

export class NotificationChannelEntity {
  constructor(
    public readonly id: string,
    public readonly notificationId: string,
    public readonly channel: string,
    public readonly status: NotificationChannelStatus,
    public readonly deliveredAt?: Date | null,
    public readonly readAt?: Date | null,
  ) {}
}
