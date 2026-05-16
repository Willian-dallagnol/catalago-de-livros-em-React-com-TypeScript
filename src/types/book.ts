export type BookStatus = 'Lido' | 'Não lido'

export interface Book {
  _id?: string
  title: string
  author: string
  status: BookStatus
}

export interface BookItemProps {
  book: Book
  onRemove: (id: string) => void
  onToggleStatus: (id: string, next: BookStatus) => void
  onUpdate: (id: string, data: Partial<Book>) => void
}

export interface BookFormProps {
  onAdd: (book: Omit<Book, '_id'>) => void
  loading?: boolean
}

export interface BookListProps {
  books: Book[]
  onRemove: (id: string) => void
  onToggleStatus: (id: string, next: BookStatus) => void
  onUpdate: (id: string, data: Partial<Book>) => void
  loading?: boolean
  error?: string | null
}
