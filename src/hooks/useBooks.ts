import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import type { Book, BookStatus } from '../types/book'
import { getBooks, addBook, deleteBook, updateBook } from '../services/api'

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setError(null)
    setLoading(true)
    try {
      const data = await getBooks()
      setBooks(data)
    } catch {
      setError('Falha ao carregar livros. Verifique a VITE_API_URL no seu .env.')
      toast.error('Erro ao carregar livros!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  async function handleAdd(book: Omit<Book, '_id'>) {
    setLoading(true)
    try {
      const saved = await addBook(book)
      setBooks(prev => [...prev, saved])
      toast.success(`"${saved.title}" adicionado ao catálogo!`)
    } catch {
      setError('Não foi possível adicionar o livro.')
      toast.error('Erro ao adicionar livro!')
    } finally {
      setLoading(false)
    }
  }

  async function handleRemove(id: string) {
    setLoading(true)
    try {
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b._id !== id))
      toast.success('Livro removido.')
    } catch {
      setError('Não foi possível remover o livro.')
      toast.error('Erro ao remover livro!')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleStatus(id: string, next: BookStatus) {
    setLoading(true)
    try {
      const updated = await updateBook(id, { status: next })
      setBooks(prev => prev.map(b => b._id === id ? updated : b))
      toast.success(`Status alterado para "${next}".`)
    } catch {
      setError('Não foi possível atualizar o status.')
      toast.error('Erro ao atualizar status!')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string, data: Partial<Book>) {
    setLoading(true)
    try {
      const updated = await updateBook(id, data)
      setBooks(prev => prev.map(b => b._id === id ? updated : b))
      toast.success('Livro atualizado!')
    } catch {
      setError('Não foi possível atualizar o livro.')
      toast.error('Erro ao atualizar livro!')
    } finally {
      setLoading(false)
    }
  }

  return { books, loading, error, handleAdd, handleRemove, handleToggleStatus, handleUpdate }
}
