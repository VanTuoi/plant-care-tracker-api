import { Module, forwardRef } from '@nestjs/common';
import { GrowthDiariesService } from './growth-diaries.service';
import { RelationalGrowthDiaryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { GrowthDiariesController } from './growth-diaries.controller';
import { PlantsModule } from '../plants/plants.module';

@Module({
  imports: [
    RelationalGrowthDiaryPersistenceModule,
    FilesModule,
    forwardRef(() => PlantsModule),
  ],
  controllers: [GrowthDiariesController],
  providers: [GrowthDiariesService],
  exports: [GrowthDiariesService, RelationalGrowthDiaryPersistenceModule],
})
export class GrowthDiaryModule {}
