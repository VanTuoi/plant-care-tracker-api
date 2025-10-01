import { Injectable } from '@nestjs/common';
import { WateringRule } from '../rules/watering-rule.interface';
import { FrequencyWateringRule } from '../rules/frequency-watering.rule';
import { Plant } from '../../../plants/domain/plant';
import { Site } from '../../../sites/domain/site';
import { Water } from '../water';

@Injectable()
export class WateringDecisionService {
  private readonly rules: WateringRule[];

  constructor() {
    this.rules = [new FrequencyWateringRule()];
  }

  shouldNotify(
    plant: Plant,
    site: Site | undefined,
    history: Water[],
  ): boolean {
    return this.rules.some((rule) => rule.shouldNotify(plant, site, history));
  }
}
