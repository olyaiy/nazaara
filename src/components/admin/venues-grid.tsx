"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, MapPin, Calendar, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { VenueImage } from "@/components/admin/venue-image"

interface Venue {
  id: number
  slug: string
  name: string
  description: string | null
  address: string | null
  city: string
  country: string
  images: string[] | null
  eventCount: number
}

interface VenuesGridProps {
  venues: Venue[]
}

const VENUES_PER_PAGE = 9 // 3x3 grid

export function VenuesGrid({ venues }: VenuesGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter venues based on search query
  const filteredVenues = useMemo(() => {
    if (!searchQuery.trim()) return venues

    const query = searchQuery.toLowerCase()
    return venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(query) ||
        venue.city.toLowerCase().includes(query) ||
        venue.country.toLowerCase().includes(query) ||
        (venue.address && venue.address.toLowerCase().includes(query)) ||
        (venue.description && venue.description.toLowerCase().includes(query))
    )
  }, [venues, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredVenues.length / VENUES_PER_PAGE)
  const startIndex = (currentPage - 1) * VENUES_PER_PAGE
  const endIndex = startIndex + VENUES_PER_PAGE
  const paginatedVenues = filteredVenues.slice(startIndex, endIndex)

  // Reset to page 1 when search query changes
  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const showEllipsisThreshold = 5
    
    if (totalPages <= showEllipsisThreshold) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i)
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("ellipsis")
        pages.push(currentPage)
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search venues by name, city, or address..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredVenues.length === 0 ? (
          "No venues found"
        ) : (
          <>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredVenues.length)} of{" "}
            {filteredVenues.length} venue{filteredVenues.length !== 1 ? "s" : ""}
          </>
        )}
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedVenues.map((venue) => (
          <Link
            key={venue.id}
            href={`/admin/venues/${venue.slug}`}
            className="group relative overflow-hidden rounded-lg border border-border bg-background hover:border-[--gold]/50 transition-all duration-300"
          >
            {/* Venue Image */}
            <div className="aspect-[16/9] relative overflow-hidden bg-muted">
              <VenueImage 
                src={venue.images?.[0]} 
                alt={venue.name}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* View icon on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>

              {/* Event count badge */}
              {venue.eventCount > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{venue.eventCount} event{venue.eventCount !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>

            {/* Venue Info */}
            <div className="p-5 space-y-3">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-[--gold] transition-colors line-clamp-1">
                  {venue.name}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">
                    {venue.city}, {venue.country}
                    {venue.address && ` • ${venue.address}`}
                  </span>
                </div>
              </div>

              {/* Description */}
              {venue.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {venue.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page as number)
                    }}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}