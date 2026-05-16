import BookItem from './BookItem'
import type { BookListProps } from '../types/book'

export default function BookList({ books, onRemove, onToggleStatus, onUpdate, loading, error }: BookListProps) {
  if (loading && !books.length) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" aria-label="Carregando" />
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
        ⚠ {error}
      </div>
    )
  }

  if (!books.length) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
        Nenhum livro encontrado. Adicione o primeiro acima!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3" aria-label="Lista de livros">
      {books.map(b => (
        <BookItem
          key={b._id}
          book={b}
          onRemove={onRemove}
          onToggleStatus={onToggleStatus}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  )
}
