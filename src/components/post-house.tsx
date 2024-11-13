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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

export default function PostHouse() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const typeValues = ["independent", "flat", "duplex", "studio"] as const
  const negotiableValues = ["yes", "maybe", "no"] as const
  const statusValues = ["active", "inactive"] as const

  const formSchema = z.object({
    name: z.string().min(2),
    type: z.enum(typeValues, { required_error: "You must select an option", }),
    area: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    pricing: z.string().min(2),
    negotiable: z.enum(negotiableValues, { required_error: "You must select an option", }),
    status: z.enum(statusValues, { required_error: "You must select an option", }),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      !(localStorage.getItem("restful_name") &&
        localStorage.getItem("restful_address") &&
        localStorage.getItem("restful_email") &&
        localStorage.getItem("restful_phone")
      )
    ) {
      toast.error("Update your profile first!")
      setOpen(false)
      console.log("update your profile first!")
      return
    }

    const postHouseObj = {
      house_name: values.name,
      house_type: values.type,
      address: {
        city: values.city,
        area: values.area,
        state: values.state,
        country: values.country
      },
      price: values.pricing,
      negotiable: values.negotiable,
      owner_details: {
        name: localStorage.getItem("restful_name"),
        address: localStorage.getItem("restful_address"),
        email: localStorage.getItem("restful_email"),
        phone: localStorage.getItem("restful_phone")
      },
      status: values.status,
    }

    try {
      fetch("/api/house", {
        method: "POST",
        body: JSON.stringify(postHouseObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          if (json.success) {
            toast.success("Successfully uploaded!")
            setOpen(false)
          } else {
            toast.error("An error occurred")
          }
        })

    } catch (e) {
      console.error(e)
    }
  }

  function HouseForm({ className }: React.ComponentProps<"form">) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        area: "",
        city: "",
        state: "",
        country: "",
        pricing: "",
      },
    })
    return (
      <Form {...form}>
        <form className={cn("grid items-start gap-4 max-lg:max-h-[calc(100dvh-15rem)] max-sm:overflow-y-scroll", className)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jeevan Villa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 flex-wrap">
            <span className="text-sm">Property Type: </span>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="inline-flex"
                    >
                      {typeValues.map((value, idx) => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={idx}>
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="text-sm capitalize">
                            {value}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          Address
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="flex w-full items-center gap-4">
            <FormField
              control={form.control}
              name="pricing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing</FormLabel>
                  <FormControl>
                    <div className="relative inline-flex pl-5">
                      <IndianRupeeIcon className="absolute text-muted-foreground  pt-3" />
                      <Input type="number" className="pl-5 w-full" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="text-sm">Negotiable? </span>
            <FormField
              control={form.control}
              name="negotiable"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="inline-flex"
                    >
                      {negotiableValues.map((value, idx) => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={idx}>
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="text-sm capitalize">
                            {value}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="text-sm">Status</span>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="inline-flex"
                    >
                      {statusValues.map((value, idx) => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={idx}>
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="text-sm capitalize">
                            {value}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>Confirm property details <HousePlusIcon /></Button>
        </form>
      </Form>
    )
  }

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
