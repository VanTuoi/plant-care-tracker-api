import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis-pubsub.service';
import { WebsocketGateway } from './websockets.gateway';

@Module({
  providers: [WebsocketGateway, RedisPubSubService],
  exports: [WebsocketGateway, RedisPubSubService],
})
export class WsModule {}
