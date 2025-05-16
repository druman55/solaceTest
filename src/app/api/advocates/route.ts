import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from 'drizzle-orm';

export async function GET() {
  const data = await db.select({
    id: advocates.id,
    firstName: advocates.firstName,
    firstNameFilter: sql<string>`lower(${advocates.firstName})`, // derived data for filtering
    lastName: advocates.lastName,
    lastNameFilter: sql<string>`lower(${advocates.lastName})`, // derived data for filtering
    city: advocates.city,
    cityFilter: sql<string>`lower(${advocates.city})`, // derived data for filtering
    degree: advocates.degree,
    degreeFilter: sql<string>`lower(${advocates.degree})`, // derived data for filtering
    specialties: advocates.specialties,
    specialtiesFilter: sql<string>`lower(${advocates.specialties}::text)`, // derived data for filtering
    yearsOfExperience: advocates.yearsOfExperience,
    phoneNumber: advocates.phoneNumber,
  }).from(advocates);
  return Response.json({ data });
}
