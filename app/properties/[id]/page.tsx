import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { ScoreBreakdown } from "@/lib/scoring";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id }
  });

  if (!property) {
    notFound();
  }

  const breakdown = property.scoreBreakdown as unknown as ScoreBreakdown;

  return (
    <main className="grid">
      <section className="card" style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1>{property.title}</h1>
          <p className="muted">
            {property.municipality} · Added {new Date(property.createdAt).toLocaleDateString("en-CA")}
          </p>
          {property.listingUrl ? (
            <p>
              <a href={property.listingUrl} target="_blank" rel="noreferrer">
                Open source listing
              </a>
            </p>
          ) : null}
        </div>
        <div className="card" style={{ minWidth: 170, textAlign: "center" }}>
          <div className="muted">Total score</div>
          <div className="kpi">{property.totalScore}/100</div>
        </div>
      </section>

      <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div className="card">
          <h3>Pricing and size</h3>
          <p>Asking price: {property.askingPriceCad.toLocaleString("en-CA")} CAD</p>
          <p>Interior: {property.interiorSqft.toLocaleString("en-CA")} sqft</p>
          <p>Lot: {property.lotSqft.toLocaleString("en-CA")} sqft</p>
        </div>
        <div className="card">
          <h3>Capacity</h3>
          <p>
            {property.bedrooms} beds · {property.bathrooms} baths · {property.maxGuests} guests
          </p>
          <p>Distance to ski: {property.distanceToSkiKm} km</p>
          <p>Distance to village: {property.distanceToVillageKm} km</p>
        </div>
      </section>

      <section className="card">
        <h2>Score breakdown</h2>
        <table>
          <tbody>
            <tr>
              <td>Price to size fit</td>
              <td>{breakdown.priceToSize} / 20</td>
            </tr>
            <tr>
              <td>Location access</td>
              <td>{breakdown.location} / 20</td>
            </tr>
            <tr>
              <td>Capacity utility</td>
              <td>{breakdown.capacity} / 20</td>
            </tr>
            <tr>
              <td>Bike/outdoor access</td>
              <td>{breakdown.bikeAndOutdoor} / 15</td>
            </tr>
            <tr>
              <td>Condition</td>
              <td>{breakdown.condition} / 15</td>
            </tr>
            <tr>
              <td>Revenue potential</td>
              <td>{breakdown.revenuePotential} / 15</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Pasted listing text</h2>
        <p className="muted" style={{ whiteSpace: "pre-wrap" }}>
          {property.listingText}
        </p>
      </section>

      {property.notes ? (
        <section className="card">
          <h2>Internal notes</h2>
          <p className="muted" style={{ whiteSpace: "pre-wrap" }}>
            {property.notes}
          </p>
        </section>
      ) : null}

      <Link href="/">← Back to dashboard</Link>
    </main>
  );
}
