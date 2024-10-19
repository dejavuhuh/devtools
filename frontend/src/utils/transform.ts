import type { SortOrder } from 'antd/lib/table/interface'

export function toSortCode(sort: Record<string, SortOrder>): string {
  return Object.entries(sort)
    .map(([key, value]) => {
      const direction = value === 'ascend' ? 'asc' : 'desc'
      return `${key} ${direction}`
    })
    .join(', ')
}
