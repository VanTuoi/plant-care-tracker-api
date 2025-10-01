import { Plant } from '../../../plants/domain/plant';
import { Site } from '../../../sites/domain/site';
import { Water } from '../water';

export interface WateringRule {
  shouldNotify(plant: Plant, site: Site | undefined, history: Water[]): boolean;
}
