import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.connectedUsers.set(userId, client.id);
      console.log(
        `User with id: ${userId} connected with socket id: ${client.id}`,
      );
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.connectedUsers.entries()].find(
      (entry) => entry[1] === client.id,
    )?.[0];
    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`User with id ${userId} disconnected`);
    }
  }

  sendToUser(userId: string, payload: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('new_notification', payload);
    }
  }

  broadcast(payload: any) {
    this.server.emit('new_notification', payload);
  }
}
