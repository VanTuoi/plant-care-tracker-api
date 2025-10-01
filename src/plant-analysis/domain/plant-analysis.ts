export class PlantAnalysis {
  constructor(
    public readonly name: string,
    public readonly probability: number,
    public readonly imageUrl?: string,
    public readonly scientificName?: string,
  ) {}
}
