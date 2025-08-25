import { NotificationPriority } from '../constants/notifier.constants';

export class NotificationResponseDto {
  id: string;
  userId: string;
  email: string | null;
  title: string;
  message: string;
  payload?: Record<string, any> | null;
  priority: NotificationPriority;
  createdAt: Date;
}
