export type ScoreBreakdown = {
  priceToSize: number;
  location: number;
  capacity: number;
  bikeAndOutdoor: number;
  condition: number;
  revenuePotential: number;
};

export type PropertyInput = {
  askingPriceCad: number;
  interiorSqft: number;
  distanceToSkiKm: number;
  distanceToVillageKm: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  bikeAccessScore: number;
  conditionScore: number;
  rentalRevenuePotential: number;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export function scoreProperty(input: PropertyInput): { totalScore: number; breakdown: ScoreBreakdown } {
  const pricePerSqft = input.askingPriceCad / input.interiorSqft;

  const priceToSize = clamp(Math.round(20 - (pricePerSqft - 180) / 12), 0, 20);
  const skiScore = clamp(Math.round(10 - input.distanceToSkiKm), 0, 10);
  const villageScore = clamp(Math.round(10 - input.distanceToVillageKm * 1.2), 0, 10);
  const location = skiScore + villageScore;

  const guestsScore = clamp(Math.round(input.maxGuests / 2), 0, 8);
  const bedroomsScore = clamp(input.bedrooms * 2, 0, 8);
  const bathroomsScore = clamp(Math.round(input.bathrooms * 2), 0, 4);
  const capacity = guestsScore + bedroomsScore + bathroomsScore;

  const bikeAndOutdoor = clamp(input.bikeAccessScore, 0, 15);
  const condition = clamp(input.conditionScore, 0, 15);
  const revenuePotential = clamp(input.rentalRevenuePotential, 0, 15);

  const breakdown: ScoreBreakdown = {
    priceToSize,
    location,
    capacity,
    bikeAndOutdoor,
    condition,
    revenuePotential
  };

  const totalScore = Object.values(breakdown).reduce((sum, current) => sum + current, 0);

  return { totalScore: clamp(totalScore, 0, 100), breakdown };
}
