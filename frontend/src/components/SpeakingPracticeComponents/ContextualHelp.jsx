import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RotateCcw, Settings, HelpCircle } from 'lucide-react'

export default function Component() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" title="Get a new question">
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Get a new question</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to get a new set of questions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Open settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open settings to select topics</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Help</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How to use Refresh and Settings</DialogTitle>
            <DialogDescription>
              Learn how to customize your IELTS Speaking Practice experience.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <RotateCcw className="h-4 w-4 justify-self-end" />
              <div className="col-span-3">
                <h3 className="font-semibold">Refresh Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Click this button to get a new set of random questions for all parts.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Settings className="h-4 w-4 justify-self-end" />
              <div className="col-span-3">
                <h3 className="font-semibold">Topic Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Open settings to choose specific topics for each part of the test. Apply your selection to get tailored questions.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}