import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import googleConfig from './auth-google/config/google.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { SitesModule } from './sites/sites.module';
import { SpeciesModule } from './species/species.module';
import { WatersModule } from './waters/waters.module';
import { FertilizersModule } from './fertilizers/fertilizers.module';
import { PlantsModule } from './plants/plants.module';
import { TemplateSitesModule } from './template-sites/template-sites.module';
import { PlantImageModule } from './plant-image/plant-image.module';
import { GrowthDiaryModule } from './growth-diaries/growth-diaries.module';
import { ReminderOptionsModule } from './reminder-options/reminder-options.module';
import { NotificationLogsModule } from './notification-logs/notification-logs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotifierModule } from './notifier/notifier.module';
import { PlantAnalysisModule } from './plant-analysis/plant-analysis.module';
import { ScheduleModule } from '@nestjs/schedule';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    AuthGoogleModule,
    SessionModule,
    FilesModule,
    MailModule,
    NotifierModule,
    HomeModule,
    PlantAnalysisModule,
    TemplateSitesModule,
    SitesModule,
    SpeciesModule,
    PlantsModule,
    PlantImageModule,
    GrowthDiaryModule,
    WatersModule,
    FertilizersModule,
    ReminderOptionsModule,
    NotificationsModule,
    NotificationLogsModule,
  ],
})
export class AppModule {}
