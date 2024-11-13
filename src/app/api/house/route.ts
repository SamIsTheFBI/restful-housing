"use server"

import { NextResponse } from "next/server"
import { db } from "@/server/db"
import { house, SelectHouse } from "@/server/db/schema/house"
import { owner } from "@/server/db/schema/owner"

export async function POST(request: Request) {
  const houseDetails = await request.json()
  console.log(houseDetails)
  const houseDb: Omit<SelectHouse, "id"> = {
    houseType: houseDetails.house_type,
    city: houseDetails.address.city,
    state: houseDetails.address.state,
    area: houseDetails.address.area,
    country: houseDetails.address.country,
    price: houseDetails.price,
    status: houseDetails.status,
    houseName: houseDetails.house_name,
    negotiable: houseDetails.negotiable,
    ownerPhone: houseDetails.owner_details.phone
  }
  try {
    await db
      .insert(owner)
      .values(houseDetails.owner_details)
      .onConflictDoUpdate({
        target: owner.phone,
        set: {
          name: houseDetails.owner_details.name,
          email: houseDetails.owner_details.email,
          address: houseDetails.owner_details.address,
        }
      })

    await db
      .insert(house)
      .values(houseDb)

    return new NextResponse(JSON.stringify({ success: true, message: 'house added successfully', house: houseDetails }))
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
