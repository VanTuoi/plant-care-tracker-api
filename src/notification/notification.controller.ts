import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotificationGateway } from './infrastructure/websocket/notification.gateway';

@ApiTags('Notifications')
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Post('send')
  @ApiOperation({ summary: 'Send notification to a user' })
  @ApiBody({ type: SendNotificationDto })
  @ApiResponse({ status: 200, description: 'Notification sent successfully' })
  async sendNotification(@Body() body: SendNotificationDto) {
    this.notificationGateway.server
      .to(body.userId)
      .emit('new_notification', {
        message: body.message,
        type: 'user',
      });

    return { status: 'ok' };
  }
}
