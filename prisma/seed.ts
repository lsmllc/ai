import { PrismaClient } from "@prisma/client";
import { scoreProperty } from "../lib/scoring";

const prisma = new PrismaClient();

const chalets = [
  {
    title: "Le Massif Ridge Chalet",
    municipality: "Petite-Rivière-Saint-François",
    askingPriceCad: 739000,
    bedrooms: 4,
    bathrooms: 2.5,
    maxGuests: 10,
    interiorSqft: 2280,
    lotSqft: 18400,
    distanceToSkiKm: 4.2,
    distanceToVillageKm: 9.8,
    bikeAccessScore: 13,
    conditionScore: 12,
    rentalRevenuePotential: 14,
    listingText: "Contemporary chalet with river views, wood stove, and quick access to Le Massif and summer bike descents.",
    notes: "Strong shoulder-season potential with cyclists."
  },
  {
    title: "Baie-Saint-Paul Panorama Cabin",
    municipality: "Baie-Saint-Paul",
    askingPriceCad: 625000,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    interiorSqft: 1910,
    lotSqft: 15200,
    distanceToSkiKm: 15,
    distanceToVillageKm: 5.1,
    bikeAccessScore: 11,
    conditionScore: 10,
    rentalRevenuePotential: 11,
    listingText: "Warm cedar cabin near art galleries and road cycling loops, with detached sauna.",
    notes: "Great town access; weaker ski convenience."
  },
  {
    title: "Saint-Irénée Coastal Escape",
    municipality: "Saint-Irénée",
    askingPriceCad: 579000,
    bedrooms: 3,
    bathrooms: 1.5,
    maxGuests: 7,
    interiorSqft: 1730,
    lotSqft: 19800,
    distanceToSkiKm: 28,
    distanceToVillageKm: 3.3,
    bikeAccessScore: 12,
    conditionScore: 9,
    rentalRevenuePotential: 10,
    listingText: "Ocean-view chalet with large deck and easy rolling climbs for road biking.",
    notes: "Excellent summer demand profile."
  },
  {
    title: "Les Éboulements Summit House",
    municipality: "Les Éboulements",
    askingPriceCad: 812000,
    bedrooms: 5,
    bathrooms: 3,
    maxGuests: 12,
    interiorSqft: 2760,
    lotSqft: 22100,
    distanceToSkiKm: 18,
    distanceToVillageKm: 7.5,
    bikeAccessScore: 14,
    conditionScore: 13,
    rentalRevenuePotential: 15,
    listingText: "Large luxury chalet with spa, game room, and premium river lookout.",
    notes: "Top-end ADR candidate if occupancy holds."
  },
  {
    title: "Cap-à-l'Aigle Forest Retreat",
    municipality: "La Malbaie",
    askingPriceCad: 488000,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 6,
    interiorSqft: 1320,
    lotSqft: 16700,
    distanceToSkiKm: 32,
    distanceToVillageKm: 11,
    bikeAccessScore: 9,
    conditionScore: 8,
    rentalRevenuePotential: 8,
    listingText: "Rustic-modern retreat with trailhead access and private firepit.",
    notes: "Affordable entry option, but moderate renovation risk."
  },
  {
    title: "Grande-Pointe Family Chalet",
    municipality: "Petite-Rivière-Saint-François",
    askingPriceCad: 665000,
    bedrooms: 4,
    bathrooms: 2,
    maxGuests: 9,
    interiorSqft: 2140,
    lotSqft: 14900,
    distanceToSkiKm: 6.7,
    distanceToVillageKm: 12.4,
    bikeAccessScore: 12,
    conditionScore: 11,
    rentalRevenuePotential: 12,
    listingText: "Turnkey family chalet with bunk room and covered bike storage.",
    notes: "Balanced winter and summer demand."
  },
  {
    title: "Rivière-du-Gouffre Cyclist Basecamp",
    municipality: "Baie-Saint-Paul",
    askingPriceCad: 542000,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    interiorSqft: 1680,
    lotSqft: 13400,
    distanceToSkiKm: 17,
    distanceToVillageKm: 2.2,
    bikeAccessScore: 15,
    conditionScore: 10,
    rentalRevenuePotential: 12,
    listingText: "Designed for cycling groups with wash station, workshop corner, and secure storage.",
    notes: "Excellent biking niche positioning."
  },
  {
    title: "Mont Grand-Fonds View Lodge",
    municipality: "La Malbaie",
    askingPriceCad: 718000,
    bedrooms: 4,
    bathrooms: 2.5,
    maxGuests: 10,
    interiorSqft: 2360,
    lotSqft: 20900,
    distanceToSkiKm: 9.5,
    distanceToVillageKm: 14.2,
    bikeAccessScore: 10,
    conditionScore: 12,
    rentalRevenuePotential: 13,
    listingText: "High-elevation lodge close to Mont Grand-Fonds and scenic hill routes.",
    notes: "Good winter occupancy upside."
  }
];

async function main(): Promise<void> {
  await prisma.property.deleteMany();

  for (const chalet of chalets) {
    const { totalScore, breakdown } = scoreProperty(chalet);

    await prisma.property.create({
      data: {
        ...chalet,
        totalScore,
        scoreBreakdown: breakdown
      }
    });
  }

  console.log(`Seeded ${chalets.length} chalet listings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
