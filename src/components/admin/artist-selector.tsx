"use client"

import { useState, useEffect } from "react"
import { MultiSelect, Option } from "@/components/multi-select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { GripVertical, X } from "lucide-react"

interface Artist {
  id: number
  name: string
  slug: string
}

interface ArtistSelectorProps {
  artists: Artist[]
  selectedArtists?: { id: number; name: string; orderIndex?: number }[]
  name?: string
}

export function ArtistSelector({ artists, selectedArtists = [], name = "artists" }: ArtistSelectorProps) {
  const [orderedArtists, setOrderedArtists] = useState<Artist[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // Initialize ordered artists from selectedArtists
  useEffect(() => {
    if (selectedArtists.length > 0) {
      // Sort by orderIndex if available, then map to Artist format
      const sorted = [...selectedArtists]
        .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
        .map(sa => artists.find(a => a.id === sa.id))
        .filter((a): a is Artist => a !== undefined)
      setOrderedArtists(sorted)
    }
  }, [selectedArtists, artists])

  const options: Option[] = artists.map(artist => ({
    value: artist.id.toString(),
    label: artist.name,
  }))

  const selectedOptions: Option[] = orderedArtists.map(artist => ({
    value: artist.id.toString(),
    label: artist.name,
  }))

  const handleSelectionChange = (selected: Option[]) => {
    // Find newly added artists
    const newArtistIds = selected
      .map(s => parseInt(s.value))
      .filter(id => !orderedArtists.find(a => a.id === id))
    
    // Find removed artists
    const removedArtistIds = orderedArtists
      .map(a => a.id)
      .filter(id => !selected.find(s => s.value === id.toString()))
    
    // Add new artists to the end
    const newArtists = newArtistIds
      .map(id => artists.find(a => a.id === id))
      .filter((a): a is Artist => a !== undefined)
    
    // Remove deselected artists
    const updated = orderedArtists.filter(a => !removedArtistIds.includes(a.id))
    
    setOrderedArtists([...updated, ...newArtists])
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedItem === null) return

    const draggedArtist = orderedArtists[draggedItem]
    const newOrder = [...orderedArtists]
    
    // Remove dragged item
    newOrder.splice(draggedItem, 1)
    
    // Insert at new position
    newOrder.splice(dropIndex, 0, draggedArtist)
    
    setOrderedArtists(newOrder)
    setDraggedItem(null)
  }

  const removeArtist = (artistId: number) => {
    setOrderedArtists(orderedArtists.filter(a => a.id !== artistId))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Artists</Label>
        <MultiSelect
          options={options}
          selected={selectedOptions}
          onChange={handleSelectionChange}
          placeholder="Search and select artists..."
        />
      </div>

      {orderedArtists.length > 0 && (
        <div className="space-y-2">
          <Label>Artist Lineup Order</Label>
          <p className="text-xs text-muted-foreground">Drag to reorder artists.</p>
          <div className="space-y-2">
            {orderedArtists.map((artist, index) => (
              <div
                key={artist.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`flex items-center gap-2 p-2 bg-muted/50 rounded-md cursor-move transition-opacity ${
                  draggedItem === index ? 'opacity-50' : ''
                }`}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <span className="flex-grow text-sm">{artist.name}</span>
                <button
                  type="button"
                  onClick={() => removeArtist(artist.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                {/* Hidden inputs for form submission */}
                <input type="hidden" name={`${name}[${index}][id]`} value={artist.id} />
                <input type="hidden" name={`${name}[${index}][orderIndex]`} value={index} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}