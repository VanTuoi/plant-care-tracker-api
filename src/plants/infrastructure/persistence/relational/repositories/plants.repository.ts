import { Injectable } from '@nestjs/common';
import { PlantRepository } from '../plants.repository';

@Injectable()
export class PlantsRelationalRepository implements PlantRepository {
  async create(): Promise<any> {
    await Promise.resolve();
    throw new Error('Not implemented');
  }

  async findManyWithPagination(): Promise<any[]> {
    await Promise.resolve();
    return [];
  }

  async findById(): Promise<any> {
    await Promise.resolve();
    return {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      name: 'Hoa Hồng Đỏ',
      scientificName: 'Rosa rubiginosa',
      size: 'medium',
      inGround: true,
      isDead: false,
      wateringFrequency: '3 days',
      wateringAmount: '500ml',
      wateringMethod: 'root watering',
      fertilizingFrequency: '2 weeks',
      fertilizingAmount: '100g',
      fertilizingMethod: 'soil mixing',
      fertilizerType: 'organic',
      sunlightNeed: 'full sun',
      difficultyLevel: 'moderate',
      createdAt: '2023-05-15T08:30:00Z',
      updatedAt: '2023-06-20T14:25:00Z',
      deletedAt: null,
      speciesId: 'SP#f1e2d3c4-b5a6-7890-fedc-ba9876543210',
      plantImageld: 'IMG#c3b2a1d4-e6f5-7890-cdef-ab4567890123',
      userId: '4f520d8a-62ec-43a9-8162-71713ae41563',
      siteId: 'SITE#b2a1c3d4-e6f5-7890-abcd-ef5678901234',
    };
  }

  async findByIds(): Promise<any[]> {
    await Promise.resolve();
    return [];
  }

  async update(): Promise<any | null> {
    await Promise.resolve();
    return null;
  }

  async remove(): Promise<void> {
    await Promise.resolve();
    return;
  }

  async findByPlantIds(): Promise<any[]> {
    await Promise.resolve();
    return [];
  }

  async findByUserId(): Promise<any[]> {
    await Promise.resolve();
    return [];
  }
}
