export enum NotificationChannel {
  WS = 'ws',
  REDIS = 'redis',
  MAIL = 'mail',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum NotificationChannelStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}
