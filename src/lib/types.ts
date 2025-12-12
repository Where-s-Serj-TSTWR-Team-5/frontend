export interface Plant {
  id?: number;
  name: string;
  scientificName?: string;
  description?: string;
  sunlightRequirement?: number;
  waterNeeds?: number;
  image?: string;
  plantTypeID?: number;
  createdAt?: Date;
}
