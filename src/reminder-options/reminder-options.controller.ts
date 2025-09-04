import {
  Controller,
  Get,
  Body,
  Patch,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

import { ReminderOption } from './domain/reminder-option';
import { ReminderOptionsService } from './reminder-options.service';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { UpdateReminderOptionDto } from './dto/update-reminder-option.dto';
import { FindReminderOptionsByUserDto } from './dto/find-reminder-options-by-user.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('ReminderOptions')
@Controller({
  path: 'reminder-options',
  version: '1',
})
export class ReminderOptionsController {
  constructor(
    private readonly reminderOptionsService: ReminderOptionsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [ReminderOption] })
  @SerializeOptions({ groups: ['admin'] })
  @HttpCode(HttpStatus.OK)
  findByUser(@Query() query: FindReminderOptionsByUserDto, @Req() req) {
    return this.reminderOptionsService.findByUserId(
      req.user as JwtPayloadType,
      query.userId,
    );
  }

  @ApiOkResponse({
    type: ReminderOption,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch()
  @ApiOkResponse({ type: ReminderOption })
  @SerializeOptions({ groups: ['admin'] })
  @ApiBody({ type: UpdateReminderOptionDto })
  @HttpCode(HttpStatus.OK)
  update(
    @Query() query: FindReminderOptionsByUserDto,
    @Body() dto: UpdateReminderOptionDto,
    @Req() req,
  ): Promise<ReminderOption | null> {
    return this.reminderOptionsService.updateByUserId(
      req.user as JwtPayloadType,
      query.userId,
      dto,
    );
  }
}
