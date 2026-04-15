import Link from "next/link";
import { prisma } from "@/lib/prisma";

type SortKey = "totalScore" | "askingPriceCad" | "createdAt";

const sortOptions: SortKey[] = ["totalScore", "askingPriceCad", "createdAt"];

export default async function Dashboard({
  searchParams
}: {
  searchParams: Promise<{ sort?: string; direction?: string }>;
}) {
  const params = await searchParams;
  const sort = sortOptions.includes(params.sort as SortKey) ? (params.sort as SortKey) : "totalScore";
  const direction = params.direction === "asc" ? "asc" : "desc";

  const properties = await prisma.property.findMany({
    orderBy: {
      [sort]: direction
    }
  });

  const avgScore =
    properties.length > 0
      ? Math.round(properties.reduce((sum, property) => sum + property.totalScore, 0) / properties.length)
      : 0;

  return (
    <main className="grid">
      <section className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Charlevoix Chalet Evaluator</h1>
          <p className="muted">Phase 1 MVP: manual intake, local scoring, and ranking dashboard.</p>
        </div>
        <Link href="/properties/new">
          <button type="button">+ Add Property</button>
        </Link>
      </section>

      <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <div className="card">
          <div className="muted">Listings</div>
          <div className="kpi">{properties.length}</div>
        </div>
        <div className="card">
          <div className="muted">Average score</div>
          <div className="kpi">{avgScore}/100</div>
        </div>
      </section>

      <section className="card">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>
                <Link href={`/?sort=totalScore&direction=${sort === "totalScore" && direction === "desc" ? "asc" : "desc"}`}>
                  Score
                </Link>
              </th>
              <th>
                <Link
                  href={`/?sort=askingPriceCad&direction=${sort === "askingPriceCad" && direction === "desc" ? "asc" : "desc"}`}
                >
                  Asking price (CAD)
                </Link>
              </th>
              <th>Municipality</th>
              <th>
                <Link href={`/?sort=createdAt&direction=${sort === "createdAt" && direction === "desc" ? "asc" : "desc"}`}>
                  Added
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>
                  <Link href={`/properties/${property.id}`}>{property.title}</Link>
                </td>
                <td>{property.totalScore}</td>
                <td>{property.askingPriceCad.toLocaleString("en-CA")}</td>
                <td>{property.municipality}</td>
                <td>{new Date(property.createdAt).toLocaleDateString("en-CA")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
