import Link from "next/link";
import { createProperty } from "@/app/actions";

export default function NewPropertyPage() {
  return (
    <main className="grid">
      <section className="card">
        <h1>Add a chalet listing</h1>
        <p className="muted">Paste listing text and enter the core investment metrics manually.</p>
        <form action={createProperty}>
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Listing URL (optional)
            <input name="listingUrl" type="url" placeholder="https://..." />
          </label>
          <label>
            Municipality
            <select name="municipality" defaultValue="Baie-Saint-Paul">
              <option>Baie-Saint-Paul</option>
              <option>Petite-Rivière-Saint-François</option>
              <option>La Malbaie</option>
              <option>Les Éboulements</option>
              <option>Saint-Irénée</option>
            </select>
          </label>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label>
              Asking price (CAD)
              <input name="askingPriceCad" type="number" min="50000" required />
            </label>
            <label>
              Bedrooms
              <input name="bedrooms" type="number" min="1" required />
            </label>
            <label>
              Bathrooms
              <input name="bathrooms" type="number" step="0.5" min="1" required />
            </label>
            <label>
              Max guests
              <input name="maxGuests" type="number" min="1" required />
            </label>
            <label>
              Interior sqft
              <input name="interiorSqft" type="number" min="350" required />
            </label>
            <label>
              Lot sqft
              <input name="lotSqft" type="number" min="1000" required />
            </label>
            <label>
              Distance to ski (km)
              <input name="distanceToSkiKm" type="number" step="0.1" min="0" required />
            </label>
            <label>
              Distance to village (km)
              <input name="distanceToVillageKm" type="number" step="0.1" min="0" required />
            </label>
            <label>
              Bike access score (0-15)
              <input name="bikeAccessScore" type="number" min="0" max="15" required />
            </label>
            <label>
              Condition score (0-15)
              <input name="conditionScore" type="number" min="0" max="15" required />
            </label>
            <label>
              Revenue potential (0-15)
              <input name="rentalRevenuePotential" type="number" min="0" max="15" required />
            </label>
          </div>

          <label>
            Listing text
            <textarea
              name="listingText"
              required
              placeholder="Paste full listing summary, amenities, highlights, and anything useful for later AI ingestion."
            />
          </label>

          <label>
            Notes (optional)
            <textarea name="notes" placeholder="Deal notes, due diligence reminders, renovation concerns..." />
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit">Save and score property</button>
            <Link href="/">
              <button type="button" style={{ background: "#475569", borderColor: "#475569" }}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
