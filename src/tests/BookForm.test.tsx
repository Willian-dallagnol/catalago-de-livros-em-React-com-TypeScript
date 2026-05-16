import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BookForm from '../components/BookForm'

describe('BookForm', () => {
  it('renderiza os campos de título, autor e status', () => {
    render(<BookForm onAdd={jest.fn()} />)
    expect(screen.getByPlaceholderText(/Dom Casmurro/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Machado de Assis/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('não chama onAdd com campos vazios', () => {
    const onAdd = jest.fn()
    render(<BookForm onAdd={onAdd} />)
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }))
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('exibe erro de validação ao sair do campo vazio', async () => {
    render(<BookForm onAdd={jest.fn()} />)
    const titleInput = screen.getByPlaceholderText(/Dom Casmurro/i)
    fireEvent.blur(titleInput)
    expect(await screen.findByText(/título obrigatório/i)).toBeInTheDocument()
  })

  it('chama onAdd com os dados corretos e limpa o formulário', async () => {
    const user = userEvent.setup()
    const onAdd = jest.fn()
    render(<BookForm onAdd={onAdd} />)

    await user.type(screen.getByPlaceholderText(/Dom Casmurro/i), 'O Alquimista')
    await user.type(screen.getByPlaceholderText(/Machado de Assis/i), 'Paulo Coelho')
    await user.click(screen.getByRole('button', { name: /adicionar/i }))

    expect(onAdd).toHaveBeenCalledWith({
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      status: 'Não lido',
    })
    expect(screen.getByPlaceholderText(/Dom Casmurro/i)).toHaveValue('')
  })

  it('desabilita o botão quando loading=true', () => {
    render(<BookForm onAdd={jest.fn()} loading={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveTextContent(/adicionando/i)
  })
})
