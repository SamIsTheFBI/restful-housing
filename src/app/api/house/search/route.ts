"use server"

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/server/db"
import { house } from "@/server/db/schema/house"
import { ilike } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const offset = parseInt(searchParams.get('offset') || '0')

  try {
    const houses = await db
      .select()
      .from(house)
      .where(ilike(house.houseName, `%${query}%`))
      .limit(5)
      .offset(offset)
    return new NextResponse(JSON.stringify({
      success: true,
      query: query,
      offset: offset,
      result: houses
    }))
  } catch (e) {
    console.error(e)
    return new NextResponse(JSON.stringify({
      success: false,
      message: "error occurred"
    }))
  }
}
