"use server"

import { NextResponse } from "next/server"
import { db } from "@/server/db"
import { house } from "@/server/db/schema/house"

export async function GET(_request: Request, context: { params: Promise<{ searchTerm: string }> }) {
  const searchTerm = (await context.params).searchTerm
  try {
    const houses = await db.select().from(house)
    return new NextResponse(JSON.stringify({ "query": searchTerm, "result": houses }))
  } catch (e) {
    console.error(e)
  }
}
