import { useState } from 'react'
import type { BookItemProps, BookStatus } from '../types/book'

export default function BookItem({ book, onRemove, onToggleStatus, onUpdate }: BookItemProps) {
  const nextStatus: BookStatus = book.status === 'Lido' ? 'Não lido' : 'Lido'
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)

  function handleSave() {
    if (title.trim() && author.trim()) {
      if (title !== book.title || author !== book.author) {
        onUpdate(book._id!, { title: title.trim(), author: author.trim() })
      }
    }
    setEditing(false)
  }

  function handleCancel() {
    setTitle(book.title)
    setAuthor(book.author)
    setEditing(false)
  }

  const isRead = book.status === 'Lido'

  return (
    <li
      data-testid="book-item"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition"
    >
      {editing ? (
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            aria-label="Editar título"
            className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            aria-label="Editar autor"
            className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">{book.title}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{book.author}</span>
          <span
            data-testid="book-status"
            className={`mt-1 self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isRead
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
            }`}
          >
            {isRead ? '✓ Lido' : '○ Não lido'}
          </span>
        </div>
      )}

      {!editing && (
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onToggleStatus(book._id!, nextStatus)}
            aria-label={`Marcar como ${nextStatus}`}
            className="px-3 py-1.5 text-xs font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            {isRead ? '↩ Não lido' : '✓ Lido'}
          </button>
          <button
            onClick={() => setEditing(true)}
            aria-label={`Editar ${book.title}`}
            className="px-3 py-1.5 text-xs font-semibold border border-indigo-200 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
          >
            Editar
          </button>
          <button
            onClick={() => onRemove(book._id!)}
            aria-label={`Remover ${book.title}`}
            className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-500 dark:border-red-800 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition"
          >
            Remover
          </button>
        </div>
      )}
    </li>
  )
}
