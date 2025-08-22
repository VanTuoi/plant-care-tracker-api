export class Notification {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly message: string,
    public readonly type: 'system' | 'user' | 'marketing',
    public readonly createdAt: Date = new Date(),
    public readAt: Date | null,
  ) {}
}
