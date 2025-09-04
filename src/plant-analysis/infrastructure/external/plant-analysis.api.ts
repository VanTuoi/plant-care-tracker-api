import { BadRequestException, Injectable } from '@nestjs/common';
import { PlantAnalysis } from '../../domain/plant-analysis';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class PlantAnalysisApi {
  private readonly apiKey = process.env.PLANT_ANALYSIS_API_KEY;
  private readonly baseUrl = 'https://my-api.plantnet.org/v2/identify/all';
  private readonly includeImage = 'true';
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png'];

  async identify(file: Express.Multer.File): Promise<PlantAnalysis[]> {
    if (!this.apiKey) throw new BadRequestException('No api key');
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
        { headers: { ...form.getHeaders() } },
      );

      const data = response.data;

      if (!data.results || data.results.length === 0) {
        return [];
      }

      const plants: PlantAnalysis[] = data.results.map((r: any) => {
        const name = r.species?.scientificNameWithoutAuthor || 'Unknown';
        const scientificName = r.species?.scientificName || name;
        const probability = Math.round((r.score || 0) * 100);
        const imageUrl = r.images?.[0]?.url || null;

        return new PlantAnalysis(name, probability, imageUrl, scientificName);
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
