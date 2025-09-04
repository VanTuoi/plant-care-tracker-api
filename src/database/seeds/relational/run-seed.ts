import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { TemplateSiteSeedService } from './template-site/template-site-seed.service';
import { SiteSeedService } from './sites/site-seed.service';
import { SpeciesSeedService } from './species/species-seed.service';
import { PlantSeedService } from './plants/plants-seed.service';
import { ReminderOptionSeedService } from './reminder-option/reminder-option-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(ReminderOptionSeedService).run();
  await app.get(TemplateSiteSeedService).run();
  await app.get(SiteSeedService).run();
  await app.get(SpeciesSeedService).run();
  await app.get(PlantSeedService).run();

  await app.close();
};

void runSeed();
