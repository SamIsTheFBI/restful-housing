"use server"

import { NextResponse } from "next/server"
import { db } from "@/server/db"
import { house } from "@/server/db/schema/house"

export async function POST(request: Request) {
  const houseDetails = await request.json()
  console.log(houseDetails)
  try {
    return new NextResponse(JSON.stringify({ message: 'house added successfully', house: houseDetails }))
  } catch (e) {
    console.error(e)
    return new NextResponse(JSON.stringify({ message: 'error occurred when trying to add house' }))
  }
}

export async function GET() {
  try {
    const allHouses = await db.select().from(house)
    return new NextResponse(JSON.stringify(allHouses))
  } catch (e) {
    console.error(e)
  }
}
