"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface VenueOption {
  id: number
  name: string
  city: string
}

interface InitialStop {
  city: string
  country: string
  venueId: number | null
  startTime: string | Date
  endTime: string | Date
  ticketUrl: string | null
  orderIndex?: number
}

interface EventStopsEditorProps {
  venues: VenueOption[]
  initialStops?: InitialStop[]
}

function toLocalInputValue(value: string | Date | null | undefined): string {
  if (!value) return ""
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return ""
  const pad = (n: number) => n.toString().padStart(2, "0")
  const yyyy = date.getFullYear()
  const mm = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const hh = pad(date.getHours())
  const mi = pad(date.getMinutes())
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`
}

interface StopState {
  city: string
  country: string
  venueId: string
  startLocal: string
  endLocal: string
  ticketUrl: string
}

export function EventStopsEditor({ venues, initialStops = [] }: EventStopsEditorProps) {
  const [stops, setStops] = useState<StopState[]>(
    initialStops.length > 0
      ? initialStops
          .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
          .map((s) => ({
            city: s.city || "",
            country: s.country || "",
            venueId: s.venueId ? String(s.venueId) : "",
            startLocal: toLocalInputValue(s.startTime),
            endLocal: toLocalInputValue(s.endTime),
            ticketUrl: s.ticketUrl || "",
          }))
      : []
  )

  function addStop() {
    setStops((prev) => [
      ...prev,
      { city: "", country: "", venueId: "", startLocal: "", endLocal: "", ticketUrl: "" },
    ])
  }

  function removeStop(index: number) {
    setStops((prev) => prev.filter((_, i) => i !== index))
  }

  function updateStop(index: number, field: keyof StopState, value: string) {
    setStops((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Tour Stops</h3>
        <Button type="button" variant="secondary" onClick={addStop}>
          <Plus className="h-4 w-4 mr-2" /> Add stop
        </Button>
      </div>

      {stops.length === 0 ? (
        <p className="text-sm text-muted-foreground">No stops added yet.</p>
      ) : null}

      <div className="space-y-6">
        {stops.map((stop, index) => (
          <div key={index} className="rounded-lg border border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Stop {index + 1}</p>
              <Button type="button" variant="outline" size="sm" onClick={() => removeStop(index)}>
                <Trash2 className="h-4 w-4 mr-2" /> Remove
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`stops-${index}-city`}>City *</Label>
                <Input
                  id={`stops-${index}-city`}
                  value={stop.city}
                  onChange={(e) => updateStop(index, "city", e.target.value)}
                  placeholder="Vancouver"
                  className="bg-background"
                />
                <input type="hidden" name={`stops[${index}][city]`} value={stop.city} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`stops-${index}-country`}>Country *</Label>
                <Input
                  id={`stops-${index}-country`}
                  value={stop.country}
                  onChange={(e) => updateStop(index, "country", e.target.value)}
                  placeholder="Canada"
                  className="bg-background"
                />
                <input type="hidden" name={`stops[${index}][country]`} value={stop.country} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`stops-${index}-venue`}>Venue (optional)</Label>
              <Select
                value={stop.venueId}
                onValueChange={(v) => updateStop(index, "venueId", v)}
              >
                <SelectTrigger id={`stops-${index}-venue`} className="bg-background">
                  <SelectValue placeholder="Select a venue (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No venue</SelectItem>
                  {venues.map((v) => (
                    <SelectItem key={v.id} value={String(v.id)}>
                      {v.name} – {v.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name={`stops[${index}][venueId]`}
                value={stop.venueId === "none" ? "" : stop.venueId}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`stops-${index}-start`}>Start date & time *</Label>
                <Input
                  id={`stops-${index}-start`}
                  type="datetime-local"
                  value={stop.startLocal}
                  onChange={(e) => updateStop(index, "startLocal", e.target.value)}
                  className="bg-background"
                />
                <input
                  type="hidden"
                  name={`stops[${index}][startTime]`}
                  value={stop.startLocal ? new Date(stop.startLocal).toISOString() : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`stops-${index}-end`}>End date & time *</Label>
                <Input
                  id={`stops-${index}-end`}
                  type="datetime-local"
                  value={stop.endLocal}
                  onChange={(e) => updateStop(index, "endLocal", e.target.value)}
                  className="bg-background"
                />
                <input
                  type="hidden"
                  name={`stops[${index}][endTime]`}
                  value={stop.endLocal ? new Date(stop.endLocal).toISOString() : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`stops-${index}-ticket`}>Ticket URL (optional)</Label>
              <Input
                id={`stops-${index}-ticket`}
                type="url"
                value={stop.ticketUrl}
                onChange={(e) => updateStop(index, "ticketUrl", e.target.value)}
                placeholder="https://tickets.example.com/stop"
                className="bg-background"
              />
              <input type="hidden" name={`stops[${index}][ticketUrl]`} value={stop.ticketUrl} />
            </div>

            <input type="hidden" name={`stops[${index}][orderIndex]`} value={index} />
          </div>
        ))}
      </div>
    </div>
  )
}
