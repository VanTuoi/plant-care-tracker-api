import { WateringRule } from './watering-rule.interface';
import { Plant } from '../../../plants/domain/plant';
import { Site } from '../../../sites/domain/site';
import { Water } from '../water';
import { WaterStatusEnum } from '../../waters.enum';

export class FrequencyWateringRule implements WateringRule {
  shouldNotify(
    plant: Plant,
    _site: Site | undefined,
    history: Water[],
  ): boolean {
    if (!plant.wateringFrequency) return false;

    const lastWater = history
      .filter((w) => w.status !== WaterStatusEnum.SCHEDULED)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    const now = new Date();
    const daysSinceLast = lastWater
      ? (now.getTime() - lastWater.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      : Infinity;

    return daysSinceLast >= plant.wateringFrequency;
  }
}
