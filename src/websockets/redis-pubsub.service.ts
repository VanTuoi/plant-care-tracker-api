import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    await this.client.connect();
  }

  async publish(channel: string, message: any) {
    await this.client.publish(channel, JSON.stringify(message));
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
