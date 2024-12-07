import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { truncateText } from '@/lib/utils'
  import { useMediaQuery } from 'usehooks-ts'
import { Button } from '../ui/button'

interface OrderWrapperProps {
    value: string,
    text: string,
    maxLength?: number
}

const OrderTooltipWrapper = ({
    value,
    text = '',
    maxLength = 30
}: OrderWrapperProps) => {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-left">
            {truncateText(value, maxLength)}
            {value && <span className="text-muted-foreground">...</span>}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <span dangerouslySetInnerHTML={{ __html: text }} /> 
        </DialogContent>
      </Dialog>
    )
  }
  
  return (
    <TooltipProvider>
      <div className="flex items-center gap-4">
          {`${truncateText(value, maxLength)} `}
          {(text && maxLength < text.length) && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help text-muted-foreground ">...</span>
              </TooltipTrigger>
              <TooltipContent side='left'  className="max-w-[500px] whitespace-normal bg-muted text-muted-foreground px-3 py-2 rounded-md shadow-lg">
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </TooltipContent>
            </Tooltip>
          )}
      </div>
    </TooltipProvider>
  )
}

export default OrderTooltipWrapper