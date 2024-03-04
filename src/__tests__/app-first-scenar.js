import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app'
import {submitForm} from '../api'

jest.mock('../api', () => ({
  submitForm: jest.fn().mockResolvedValue({data: 'response data'}),
}))

beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  submitForm.mockResolvedValue({message: 'Form submitted succesfully'})
})

test('Premier scénario : cas passant', async () => {
  expect(screen.getByRole('heading')).toHaveTextContent(/Welcome home/i)

  const linkElement = screen.getByRole('link', {name: /Fill out the form/i})
  expect(linkElement).toBeInTheDocument()
  userEvent.click(linkElement)

  await waitFor(() => {
    expect(window.location.href).toContain('/page-1')
  })
  const heading = screen.getByRole('heading', {name: /Page 1/i})
  expect(heading).toBeInTheDocument()

  const linkElement2 = screen.getByRole('link', {name: /Go Home/i})
  const inputElement = screen.getByLabelText(/Favorite Food/i)
  expect(linkElement2).toBeInTheDocument()
  expect(inputElement).toBeInTheDocument()

  const inputElement2 = screen.getByLabelText(/Favorite Food/i)
  userEvent.type(inputElement2, 'Les pâtes')
  expect(inputElement.value).toBe('Les pâtes')

  const linkElement3 = screen.getByRole('link', {name: /Next/i})
  expect(linkElement3).toBeInTheDocument()

  const linkElement4 = screen.getByRole('link', {name: /Next/i})
  userEvent.click(linkElement4)

  await waitFor(() => {
    console.log(window.location.href)
    expect(window.location.href).toContain('/page-2')
  })

  const heading2 = await screen.findByRole('heading', {name: /Page 2/i})
  expect(heading2).toBeInTheDocument()

  const linkElement5 = screen.getByRole('link', {name: /Go back/i})
  expect(linkElement5).toBeInTheDocument()

  const inputElement3 = screen.getByLabelText(/Favorite drink/i)
  expect(inputElement3).toBeInTheDocument()

  const inputElement4 = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(inputElement4, 'Bière')
  expect(inputElement4.value).toBe('Bière')

  const linkElement6 = screen.getByRole('link', {name: /Review/i})
  expect(linkElement6).toBeInTheDocument()

  const linkElement7 = screen.getByRole('link', {name: /Review/i})
  userEvent.click(linkElement7)

  await waitFor(() => {
    expect(window.location.href).toContain('/confirm')
  })

  const heading3 = await screen.findByRole('heading', {name: /Confirm/i})
  expect(heading3).toBeInTheDocument()

  const textElement = screen.getByText(/Please confirm your choices/i)
  expect(textElement).toBeInTheDocument()

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText('Favorite Food')).toHaveTextContent(
      'Les pâtes',
    ),
  )

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText('Favorite Food')).toHaveTextContent('Bière'),
  )

  const linkElement8 = screen.getByRole('link', {name: /Go back/i})
  expect(linkElement8).toBeInTheDocument()

  const buttonElement = screen.getByRole('button', {name: /Confirm/i})
  expect(buttonElement).toBeInTheDocument()

  const buttonElement2 = screen.getByRole('button', {name: /Confirm/i})
  userEvent.click(buttonElement2)

  await waitFor(() => {
    expect(window.location.href).toContain('/success')
  })

  const heading4 = await screen.findByRole('heading', {
    name: /Congrats\. You did it\./i,
  })
  expect(heading4).toBeInTheDocument()

  const linkElement9 = screen.getByRole('link', {name: /Go home/i})
  expect(linkElement9).toBeInTheDocument()

  const linkElement10 = screen.getByRole('link', {name: /Go home/i})
  userEvent.click(linkElement10)

  await waitFor(() => {
    expect(window.location.href).toContain('/')
  })

  const heading5 = await screen.findByRole('heading', {name: /Welcome home/i})
  expect(heading5).toBeInTheDocument()
})
