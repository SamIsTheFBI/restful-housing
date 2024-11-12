"use server"

import { db } from "@/server/db"
import { house } from "@/server/db/schema/house"
import { NextResponse } from "next/server"

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = (await context.params).id
  try {
    const allHouses = await db.select().from(house)
    const selectedHouse = allHouses.map((house) => house.id == id)
    console.log(selectedHouse)
    return new NextResponse(selectedHouse.length > 0 ? "hello" : "world")
  } catch (e) {
    console.error(e)
  }
}
