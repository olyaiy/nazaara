"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteEvent } from "@/lib/admin-actions"

interface DeleteEventFormProps {
  eventId: number
}

export function DeleteEventForm({ eventId }: DeleteEventFormProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    const formData = new FormData()
    formData.append("eventId", eventId.toString())
    await deleteEvent(formData)
  }

  return (
    <form action={deleteEvent}>
      <input type="hidden" name="eventId" value={eventId} />
      <Button 
        type="button" 
        variant="destructive" 
        className="w-full"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Event
      </Button>
    </form>
  )
}