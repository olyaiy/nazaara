"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HighlightsEditorProps {
  initialHighlights?: string[] | null
}

export function HighlightsEditor({ initialHighlights }: HighlightsEditorProps) {
  const [highlights, setHighlights] = useState<string[]>(() => {
    if (initialHighlights && initialHighlights.length > 0) {
      return initialHighlights
    }
    return ['', '', ''] // Default 3 empty highlights
  })

  const addHighlight = () => {
    setHighlights([...highlights, ''])
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...highlights]
    newHighlights[index] = value
    setHighlights(newHighlights)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Career Highlights</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Highlights</Label>
          <div className="space-y-2">
            {highlights.map((highlight, index) => (
              <Input 
                key={index}
                name={`highlights[${index}]`} 
                defaultValue={highlight}
                placeholder="Enter career highlight..."
                className="bg-background border-border"
                onChange={(e) => updateHighlight(index, e.target.value)}
              />
            ))}
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addHighlight}
          >
            Add Another Highlight
          </Button>
        </div>
      </div>
    </div>
  )
}