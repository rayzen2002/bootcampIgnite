import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}
export function Pagination({
  perPage,
  pageIndex,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Pagina {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">Primeira pagina</span>
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Pagina anterior</span>
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Proxima pagina</span>
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Ultima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
