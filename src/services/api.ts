import axios from 'axios'
import type { Book } from '../types/book'

const API_URL = import.meta.env.VITE_API_URL as string

if (!API_URL) {
  console.warn(
    '[catalogo] VITE_API_URL não definida.\n' +
    'Crie um arquivo .env na raiz com:\n' +
    'VITE_API_URL=https://crudcrud.com/api/SEU_ENDPOINT/livros'
  )
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getBooks(): Promise<Book[]> {
  const { data } = await api.get<Book[]>('')
  return data
}

export async function addBook(payload: Omit<Book, '_id'>): Promise<Book> {
  const { data } = await api.post<Book>('', payload)
  return data
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/${id}`)
}

export async function updateBook(id: string, partial: Partial<Book>): Promise<Book> {
  const { data: current } = await api.get<Book>(`/${id}`)
  const next = { ...current, ...partial } as Book
  delete (next as Partial<Book>)._id
  await api.put(`/${id}`, next)
  const { data } = await api.get<Book>(`/${id}`)
  return data
}
