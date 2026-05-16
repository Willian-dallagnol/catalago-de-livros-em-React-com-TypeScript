import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BookList from '../components/BookList'
import type { Book } from '../types/book'

const livros: Book[] = [
  { _id: '1', title: 'O Alquimista', author: 'Paulo Coelho', status: 'Lido' },
  { _id: '2', title: 'Dom Casmurro', author: 'Machado de Assis', status: 'Não lido' },
]

const defaultProps = {
  onRemove: jest.fn(),
  onToggleStatus: jest.fn(),
  onUpdate: jest.fn(),
}

describe('BookList', () => {
  it('exibe todos os livros passados', () => {
    render(<BookList books={livros} {...defaultProps} />)
    expect(screen.getAllByTestId('book-item')).toHaveLength(2)
    expect(screen.getByText('O Alquimista')).toBeInTheDocument()
    expect(screen.getByText('Dom Casmurro')).toBeInTheDocument()
  })

  it('exibe mensagem quando a lista está vazia', () => {
    render(<BookList books={[]} {...defaultProps} />)
    expect(screen.getByText(/nenhum livro encontrado/i)).toBeInTheDocument()
  })

  it('exibe spinner de carregamento quando loading=true e sem livros', () => {
    render(<BookList books={[]} loading={true} {...defaultProps} />)
    expect(screen.getByLabelText(/carregando/i)).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando error está definido', () => {
    render(<BookList books={[]} error="Falha na API" {...defaultProps} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Falha na API')
  })
})
