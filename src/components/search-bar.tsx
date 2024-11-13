"use client"

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [query, _setQuery] = useState('')
  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
      <Input type="text" placeholder="Look for houses near you"
        onChange={(e) =>
          handleQuery(e)
        } />
      <Button type="button" asChild>
        <Link href={`/?query=${query}`}>
          <Search />
        </Link></Button>
    </div>
  )
}
