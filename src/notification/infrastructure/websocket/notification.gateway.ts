import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from '../../application/services/notification.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(userId);
      console.log(`✅ User ${userId} connected`);
    }
  }

  @SubscribeMessage('send_notification_to_user')
  async handleSendNotificationToUser(
    @MessageBody() data: { userId: string; message: string; type: string },
  ) {
    const { userId, message, type } = data;
    const notification = await this.notificationService.send(userId, message, type);
    console.log('bắn thông báo');
    this.server.to(userId).emit('new_notification', notification);
    return notification;
  }
}
