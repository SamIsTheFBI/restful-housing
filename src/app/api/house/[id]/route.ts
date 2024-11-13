"use server"

import { db } from "@/server/db"
import { house } from "@/server/db/schema/house"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = (await context.params).id
  try {
    const selectedHouse = await db.select().from(house).where(eq(house.id, id))
    return new NextResponse(selectedHouse.length > 0 ? JSON.stringify(selectedHouse[0]) : JSON.stringify({ "message": "wrong id provided" }))
  } catch (e) {
    console.error(e)
    return new NextResponse(JSON.stringify({ message: "wrong id provided" }))
  }
}
