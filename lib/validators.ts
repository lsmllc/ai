import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(5),
  listingUrl: z.string().url().optional().or(z.literal("")),
  municipality: z.string().min(2),
  askingPriceCad: z.coerce.number().int().min(50000),
  bedrooms: z.coerce.number().int().min(1).max(12),
  bathrooms: z.coerce.number().min(1).max(8),
  maxGuests: z.coerce.number().int().min(1).max(24),
  interiorSqft: z.coerce.number().int().min(350).max(10000),
  lotSqft: z.coerce.number().int().min(1000).max(500000),
  distanceToSkiKm: z.coerce.number().min(0).max(200),
  distanceToVillageKm: z.coerce.number().min(0).max(200),
  bikeAccessScore: z.coerce.number().int().min(0).max(15),
  conditionScore: z.coerce.number().int().min(0).max(15),
  rentalRevenuePotential: z.coerce.number().int().min(0).max(15),
  listingText: z.string().min(30),
  notes: z.string().optional()
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
