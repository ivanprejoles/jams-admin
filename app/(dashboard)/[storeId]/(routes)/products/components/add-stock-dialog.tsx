'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { PackagePlus } from "lucide-react"
import { useState } from "react"
import { ProductColumn } from "./columns"

export function AddStockDialog({ data, addStock }: {data: ProductColumn, addStock: (value: number) => void}) {
    const [open, setOpen] = useState(false)
    const [quantity, setQuantity] = useState("")
  
    const handleAddStock = () => {
      const parsedQuantity = parseInt(quantity, 10)
      if (!isNaN(parsedQuantity)) {
        addStock(parsedQuantity)
        setOpen(false)
        setQuantity("")
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PackagePlus className="mr-2 h-4 w-4" />
            Add Stock
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogDescription>
              Enter the quantity of stock to add for this item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-4"
                placeholder="Enter quantity"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddStock} disabled={!quantity}>
              Add Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  