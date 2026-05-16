import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import { useBooks } from './hooks/useBooks'
import './styles.css'

const PAGE_SIZE = 5

export default function App() {
  const { books, loading, error, handleAdd, handleRemove, handleToggleStatus, handleUpdate } = useBooks()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<'todos' | 'Lido' | 'Não lido'>('todos')

  const filtered = books.filter(b => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'todos' || b.status === filter
    return matchSearch && matchFilter
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const lidos = books.filter(b => b.status === 'Lido').length
  const naoLidos = books.filter(b => b.status === 'Não lido').length

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleFilter(value: typeof filter) {
    setFilter(value)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            📚 Catálogo de Livros
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gerencie sua lista de leituras com persistência via CRUDCrud API
          </p>
        </div>

        {/* Stats */}
        {books.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Total', value: books.length, color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' },
              { label: 'Lidos', value: lidos, color: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
              { label: 'Não lidos', value: naoLidos, color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
            ].map(stat => (
              <div key={stat.label} className={`rounded-xl p-3 text-center ${stat.color}`}>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Card principal */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Adicionar livro
          </h2>
          <BookForm onAdd={handleAdd} loading={loading} />
        </div>

        {/* Busca e filtro */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="search"
            placeholder="Buscar por título ou autor..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            aria-label="Buscar livros"
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <select
            value={filter}
            onChange={e => handleFilter(e.target.value as typeof filter)}
            aria-label="Filtrar por status"
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            <option value="todos">Todos</option>
            <option value="Lido">Lidos</option>
            <option value="Não lido">Não lidos</option>
          </select>
        </div>

        {/* Lista */}
        <BookList
          books={paginated}
          onRemove={handleRemove}
          onToggleStatus={handleToggleStatus}
          onUpdate={handleUpdate}
          loading={loading}
          error={error}
        />

        {/* Paginação */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-6" aria-label="Paginação">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? 'page' : undefined}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  page === i + 1
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
