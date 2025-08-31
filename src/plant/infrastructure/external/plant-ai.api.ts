import { BadRequestException, Injectable } from '@nestjs/common';
import { Plant } from '../../domain/plant';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class PlantAiApi {
  private readonly apiKey = process.env.PLANT_AI_API;
  private readonly baseUrl = 'https://my-api.plantnet.org/v2/identify/all';
  private readonly includeImage = 'true';
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png'];

  async identify(file: Express.Multer.File): Promise<Plant[]> {
    if (!file) throw new BadRequestException('No file provided');

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG and PNG files are allowed');
    }

    const form = new FormData();
    form.append('images', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    form.append('organs', 'leaf');

    try {
      const response = await axios.post(
        `${this.baseUrl}?include-related-images=${this.includeImage}&api-key=${this.apiKey}`,
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        },
      );

      const data = response.data;

      const plants: Plant[] = (data.results || []).map((r: any) => {
        const name = r.species?.scientificNameWithoutAuthor || 'Unknown';
        const probability = r.score || 0;
        const imageUrl = r.images?.[0]?.url || null;

        return new Plant(name, probability, imageUrl);
      });

      return plants;
    } catch (error: any) {
      console.error(
        'PlantNet API call failed:',
        error.response?.data || error.message,
      );
      throw new BadRequestException(
        `Plant identification failed: ${error.message}`,
      );
    }
  }
}
