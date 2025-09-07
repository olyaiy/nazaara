"use client"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EventDatePickerProps {
  startTime?: Date
  endTime?: Date
}

export function EventDatePicker({ startTime, endTime }: EventDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(startTime)
  const [endDate, setEndDate] = useState<Date | undefined>(endTime)
  const [startHour, setStartHour] = useState(startTime ? format(startTime, "HH:mm") : "20:00")
  const [endHour, setEndHour] = useState(endTime ? format(endTime, "HH:mm") : "02:00")

  const combineDateTime = (date: Date | undefined, time: string) => {
    if (!date) return ""
    const [hours, minutes] = time.split(":")
    const combined = new Date(date)
    combined.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    return combined.toISOString()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            className="w-full"
          />
          <input 
            type="hidden" 
            name="startTime" 
            value={combineDateTime(startDate, startHour)} 
          />
        </div>

        <div className="space-y-2">
          <Label>End Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            className="w-full"
          />
          <input 
            type="hidden" 
            name="endTime" 
            value={combineDateTime(endDate, endHour)} 
          />
        </div>
      </div>
    </div>
  )
}