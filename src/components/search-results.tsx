import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { SelectHouse } from "@/server/db/schema/house"

export default async function SearchResults({ query }: { query: string }) {
  if (query === '') return <></>

  let result: SelectHouse[] = []
  const res = await fetch(`http://localhost:3000/api/house/search?query=${query}`, { method: 'GET' })
  if (res.ok) {
    const newRes = await res.json()
    result = newRes.result
  }

  return (
    <ul className="space-y-3">
      {result.map((item, idx) => (
        <Card key={idx}>
          <CardHeader className="flex-row flex-wrap justify-between items-start space-y-0">
            <div>
              <CardTitle>{item.houseName}</CardTitle>
            </div>
            <div className="border border-border rounded-sm px-3 p-1 relative items-center flex">
              <div className={cn("absolute size-3 rounded-full", item.status === 'active' ? 'bg-green-300' : 'bg-yellow-400')}></div>
              <span className="pl-5 capitalize">{item.status}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p>{item.city}, {item.state}, {item.country}</p>
          </CardContent>
          <CardFooter className="border border-border py-3 flex items-center flex-wrap justify-between">
            <div className="h-fit px-3 bg-muted rounded-md capitalize">Price: {item.price} {item.negotiable === 'yes' && '(Can be negotiated)'}</div>
            <div className="h-fit px-3 rounded-md capitalize">Give a call</div>
          </CardFooter>
        </Card>
      ))}
    </ul>
  )
}
