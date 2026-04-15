"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { scoreProperty } from "@/lib/scoring";
import { propertySchema } from "@/lib/validators";

export async function createProperty(formData: FormData): Promise<void> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = propertySchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid property input.");
  }

  const values = parsed.data;
  const { totalScore, breakdown } = scoreProperty(values);

  const created = await prisma.property.create({
    data: {
      ...values,
      listingUrl: values.listingUrl || null,
      notes: values.notes || null,
      totalScore,
      scoreBreakdown: breakdown
    }
  });

  revalidatePath("/");
  redirect(`/properties/${created.id}`);
}
