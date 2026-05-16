import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BookItem from '../components/BookItem'
import type { Book } from '../types/book'

const livroLido: Book = {
  _id: '1',
  title: 'O Alquimista',
  author: 'Paulo Coelho',
  status: 'Lido',
}

const livroNaoLido: Book = {
  _id: '2',
  title: 'Dom Casmurro',
  author: 'Machado de Assis',
  status: 'Não lido',
}

const defaultProps = {
  onRemove: jest.fn(),
  onToggleStatus: jest.fn(),
  onUpdate: jest.fn(),
}

describe('BookItem', () => {
  beforeEach(() => jest.clearAllMocks())

  it('exibe título, autor e status do livro', () => {
    render(<BookItem book={livroLido} {...defaultProps} />)
    expect(screen.getByText('O Alquimista')).toBeInTheDocument()
    expect(screen.getByText('Paulo Coelho')).toBeInTheDocument()
    expect(screen.getByTestId('book-status')).toHaveTextContent('Lido')
  })

  it('badge verde para livro lido', () => {
    render(<BookItem book={livroLido} {...defaultProps} />)
    expect(screen.getByTestId('book-status')).toHaveClass('bg-green-100')
  })

  it('badge amarelo para livro não lido', () => {
    render(<BookItem book={livroNaoLido} {...defaultProps} />)
    expect(screen.getByTestId('book-status')).toHaveClass('bg-amber-100')
  })

  it('chama onRemove ao clicar em Remover', () => {
    render(<BookItem book={livroLido} {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /remover/i }))
    expect(defaultProps.onRemove).toHaveBeenCalledWith('1')
  })

  it('chama onToggleStatus com status invertido', () => {
    render(<BookItem book={livroLido} {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /não lido/i }))
    expect(defaultProps.onToggleStatus).toHaveBeenCalledWith('1', 'Não lido')
  })

  it('entra em modo edição ao clicar em Editar', () => {
    render(<BookItem book={livroLido} {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /editar/i }))
    expect(screen.getByLabelText(/editar título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/editar autor/i)).toBeInTheDocument()
  })

  it('cancela edição e restaura valores originais', async () => {
    const user = userEvent.setup()
    render(<BookItem book={livroLido} {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /editar/i }))
    await user.clear(screen.getByLabelText(/editar título/i))
    await user.type(screen.getByLabelText(/editar título/i), 'Novo título')
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(screen.getByText('O Alquimista')).toBeInTheDocument()
    expect(defaultProps.onUpdate).not.toHaveBeenCalled()
  })

  it('chama onUpdate com novos dados ao salvar', async () => {
    const user = userEvent.setup()
    render(<BookItem book={livroLido} {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /editar/i }))
    const titleInput = screen.getByLabelText(/editar título/i)
    await user.clear(titleInput)
    await user.type(titleInput, 'Brida')
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }))
    expect(defaultProps.onUpdate).toHaveBeenCalledWith('1', { title: 'Brida', author: 'Paulo Coelho' })
  })
})
