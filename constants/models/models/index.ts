export interface ModelsResponse {
  id: string;
  name: string;
  releaseDate: Date;
  createdAt: Date;
  manufacturer: Manufacturer;
}

interface Manufacturer {
  id: string;
  name: string;
}
