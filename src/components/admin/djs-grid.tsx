"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ExternalLink, Instagram, Music, Headphones, Eye, EyeOff } from "lucide-react"
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
import { ArtistImage } from "@/components/admin/artist-image"

interface DJ {
  id: number
  slug: string
  name: string
  title: string | null
  specialty: string | null
  experience: string | null
  performances: string | null
  instagram: string | null
  soundcloud: string | null
  image: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface DJsGridProps {
  djs: DJ[]
}

const DJS_PER_PAGE = 16 // 4x4 grid

export function DJsGrid({ djs }: DJsGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter DJs based on search query
  const filteredDJs = useMemo(() => {
    if (!searchQuery.trim()) return djs

    const query = searchQuery.toLowerCase()
    return djs.filter(
      (dj) =>
        dj.name.toLowerCase().includes(query) ||
        (dj.title && dj.title.toLowerCase().includes(query)) ||
        (dj.specialty && dj.specialty.toLowerCase().includes(query)) ||
        (dj.instagram && dj.instagram.toLowerCase().includes(query))
    )
  }, [djs, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredDJs.length / DJS_PER_PAGE)
  const startIndex = (currentPage - 1) * DJS_PER_PAGE
  const endIndex = startIndex + DJS_PER_PAGE
  const paginatedDJs = filteredDJs.slice(startIndex, endIndex)

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
          placeholder="Search DJs by name, title, or specialty..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredDJs.length === 0 ? (
          "No DJs found"
        ) : (
          <>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredDJs.length)} of{" "}
            {filteredDJs.length} DJ{filteredDJs.length !== 1 ? "s" : ""}
          </>
        )}
      </div>

      {/* DJs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedDJs.map((dj) => (
          <Link
            key={dj.id}
            href={`/admin/djs/${dj.slug}`}
            className="group relative overflow-hidden rounded-lg border border-border bg-background hover:border-[--gold]/50 transition-all duration-300"
          >
            {/* DJ Image */}
            <div className="aspect-square relative overflow-hidden bg-muted">
              <ArtistImage src={dj.image} alt={dj.name} />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status indicators */}
              <div className="absolute top-2 left-2 flex gap-2">
                {/* Active status indicator */}
                <div className={`w-2 h-2 rounded-full ${dj.isActive ? 'bg-green-400' : 'bg-red-400'}`} title={dj.isActive ? 'Active on bookings page' : 'Hidden from bookings page'} />
              </div>
              
              {/* View icon on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              
              {/* Active/Inactive indicator on hover */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {dj.isActive ? (
                  <Eye className="h-4 w-4 text-green-400" title="Visible on bookings page" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-400" title="Hidden from bookings page" />
                )}
              </div>
            </div>

            {/* DJ Info */}
            <div className="p-4 space-y-2">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground group-hover:text-[--gold] transition-colors line-clamp-1">
                  {dj.name}
                </h3>
                {dj.title && (
                  <p className="text-xs text-[--gold]/70 font-medium">
                    {dj.title}
                  </p>
                )}
                {dj.specialty && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {dj.specialty}
                  </p>
                )}
              </div>
              
              {/* Experience and Performances */}
              {(dj.experience || dj.performances) && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {dj.experience && (
                    <span>{dj.experience}</span>
                  )}
                  {dj.experience && dj.performances && (
                    <span>•</span>
                  )}
                  {dj.performances && (
                    <span>{dj.performances}</span>
                  )}
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {dj.instagram && (
                  <div className="flex items-center gap-1">
                    <Instagram className="h-3 w-3" />
                    <span>@{dj.instagram}</span>
                  </div>
                )}
                {dj.soundcloud && (
                  <div className="flex items-center gap-1">
                    <Music className="h-3 w-3" />
                    <span>SoundCloud</span>
                  </div>
                )}
              </div>

              {/* Availability */}
              {dj.availability && (
                <div className="text-xs text-muted-foreground">
                  <span className="text-[--gold]/60">•</span> {dj.availability}
                </div>
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