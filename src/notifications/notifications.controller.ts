import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

import { NotificationsService } from './notifications.service';
import { Notification } from './domain/notification';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationDto } from './dto/notification.dto';
import { JwtPayloadType } from '../common/types/jwt-payload.type';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Notifications')
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOkResponse({ type: Notification })
  @SerializeOptions({ groups: ['admin'] })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: NotificationDto, @Req() req) {
    return this.notificationsService.findById(
      params.id,
      req.user as JwtPayloadType,
    );
  }

  @ApiOkResponse({
    type: [Notification],
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req): Promise<Notification[]> {
    return this.notificationsService.findAll(req.user as JwtPayloadType);
  }

  @ApiOkResponse({ type: Notification })
  @SerializeOptions({ groups: ['admin'] })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() params: NotificationDto,
    @Body() dto: UpdateNotificationDto,
    @Req() req,
  ): Promise<Notification | null> {
    return this.notificationsService.update(
      params.id,
      dto,
      req.user as JwtPayloadType,
    );
  }
}
