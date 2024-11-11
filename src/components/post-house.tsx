"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "usehooks-ts"
import { HousePlusIcon, IndianRupeeIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "./ui/label"

export default function PostHouse() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Put up for sale!</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Enter Housing Details</DialogTitle>
            <DialogDescription>
              Add details of your property you want to put on sale. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <HouseForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Put up for sale!</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Enter Housing Details</DrawerTitle>
          <DrawerDescription>
            Add details of your property you want to put on sale. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <HouseForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function HouseForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4 max-lg:max-h-[calc(100dvh-15rem)] max-lg:overflow-y-scroll", className)}>
      Property Details
      <div className="grid gap-2">
        <Input type="text" id="property-name" placeholder="Property Name" />
      </div>
      <div className="flex gap-3">
        <span>Property Type: </span>
        <RadioGroup defaultValue="option-one" className="inline-flex">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maybe" id="maybe" />
            <Label htmlFor="maybe">Maybe</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
      Address
      <div className="flex gap-4">
        <Input id="area" placeholder="Area" />
        <Input id="city" placeholder="City" />
      </div>
      <div className="flex gap-4">
        <Input id="state" placeholder="State" />
        <Input id="country" placeholder="Country" />
      </div>
      <div className="flex w-full items-center gap-4">
        Pricing
        <div className="relative">
          <IndianRupeeIcon className="absolute text-muted-foreground  pt-3" />
          <Input type="number" className="pl-5 w-full" />
        </div>
      </div>
      <div className="flex gap-3">
        <span>Negotiable? </span>
        <RadioGroup defaultValue="option-one" className="inline-flex">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maybe" id="maybe" />
            <Label htmlFor="maybe">Maybe</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex gap-3">
        <span>Status</span>
        <RadioGroup defaultValue="option-one" className="inline-flex">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inactive" id="inactive" />
            <Label htmlFor="inactive">Inactive</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">Confirm property details <HousePlusIcon /></Button>
    </form>
  )
}
