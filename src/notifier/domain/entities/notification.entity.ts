import { NotificationPriority } from '../../constants/notifier.constants';

export class Notification {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly email: string | null,
    public readonly title: string,
    public readonly message: string,
    public readonly payload: Record<string, any> | null = null,
    public readonly priority: NotificationPriority = NotificationPriority.NORMAL,
    public readonly createdAt: Date = new Date(),
  ) {}
}
