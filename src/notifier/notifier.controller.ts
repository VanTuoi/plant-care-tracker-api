import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationDispatcherService } from './notifier.service';

@ApiTags('Send-Notifications')
@Controller('notifications')
export class NotificationDispatcherController {
  constructor(
    private readonly dispatcherService: NotificationDispatcherService,
  ) {}

  @Post('dispatch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Trigger notifications manually' })
  @ApiResponse({
    status: 200,
    description: 'Notifications dispatched successfully',
  })
  @ApiResponse({ status: 500, description: 'Failed to dispatch notifications' })
  async dispatchNotifications(): Promise<{ message: string }> {
    try {
      await this.dispatcherService.dispatchNotifications();
      return { message: 'Notifications dispatched successfully' };
    } catch (err) {
      return {
        message: `Failed to dispatch notifications: ${(err as Error).message}`,
      };
    }
  }
}
