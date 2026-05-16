import { useState, FormEvent } from 'react'
import type { BookFormProps, BookStatus } from '../types/book'

export default function BookForm({ onAdd, loading }: BookFormProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState<BookStatus>('Não lido')
  const [touched, setTouched] = useState({ title: false, author: false })

  const titleError = touched.title && !title.trim()
  const authorError = touched.author && !author.trim()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ title: true, author: true })
    if (!title.trim() || !author.trim()) return
    onAdd({ title: title.trim(), author: author.trim(), status })
    setTitle('')
    setAuthor('')
    setStatus('Não lido')
    setTouched({ title: false, author: false })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, title: true }))}
            placeholder="Ex: Dom Casmurro"
            aria-invalid={titleError}
            aria-describedby={titleError ? 'title-error' : undefined}
            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition
              ${titleError
                ? 'border-red-400 focus:ring-red-300'
                : 'border-gray-200 dark:border-gray-600'
              }`}
          />
          {titleError && (
            <p id="title-error" className="text-xs text-red-500 mt-1">Título obrigatório</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Autor
          </label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, author: true }))}
            placeholder="Ex: Machado de Assis"
            aria-invalid={authorError}
            aria-describedby={authorError ? 'author-error' : undefined}
            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition
              ${authorError
                ? 'border-red-400 focus:ring-red-300'
                : 'border-gray-200 dark:border-gray-600'
              }`}
          />
          {authorError && (
            <p id="author-error" className="text-xs text-red-500 mt-1">Autor obrigatório</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as BookStatus)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition"
          >
            <option>Não lido</option>
            <option>Lido</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {loading ? 'Adicionando...' : '+ Adicionar livro'}
      </button>
    </form>
  )
}
