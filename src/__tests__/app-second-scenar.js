import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app'
import {submitForm} from '../api'

jest.mock('../api', () => ({
  submitForm: jest.fn(),
}))

beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  submitForm.mockRejectedValue({
    message: 'les champs food et drink sont obligatoires',
  })
})

test('Deuxième Scénario : cas non passant', async () => {
  // 1-2 - On App page, a title "Welcome home" is rendered
  expect(screen.getByRole('heading')).toHaveTextContent(/Welcome home/i)

  // 3-4 - On App page, a link with the label "Fill out the form" is present and we can click on it
  const linkElement = screen.getByRole('link', {name: /Fill out the form/i})
  expect(linkElement).toBeInTheDocument()
  userEvent.click(linkElement)

  // 5-6 - After clicking "Fill out the form", we have been redirected to page-1 and the heading is "Page 1"
  await waitFor(() => {
    expect(window.location.href).toContain('/page-1')
  })
  const heading = screen.getByRole('heading', {name: /Page 1/i})
  expect(heading).toBeInTheDocument()

  // 7-8 - On page-1, a link with the label "Go Home" is present and a field with a label "Favorite food"
  const linkElement2 = screen.getByRole('link', {name: /Go Home/i})
  const inputElement = screen.getByLabelText(/Favorite Food/i)
  expect(linkElement2).toBeInTheDocument()
  expect(inputElement).toBeInTheDocument()

  // 9 - User fills the field with ""
  const inputElement2 = screen.getByLabelText(/Favorite Food/i)
  userEvent.type(inputElement2, '')
  expect(inputElement.value).toBe('')

  // 10 - A link "Next" is in the document
  const linkElement3 = screen.getByRole('link', {name: /Next/i})
  expect(linkElement3).toBeInTheDocument()

  // 11 - User clicks on the link "Next"
  userEvent.click(linkElement3)

  // 12 - User is redirected to page 2
  await waitFor(() => {
    expect(window.location.href).toContain('/page-2')
  })

  // 13 - A heading "Page 2" is in the document
  const heading2 = await screen.findByRole('heading', {name: /Page 2/i})
  expect(heading2).toBeInTheDocument()

  // 14 - A link "Go back" is in the document
  const linkElement5 = screen.getByRole('link', {name: /Go back/i})
  expect(linkElement5).toBeInTheDocument()

  // 15 - A field with the label "Favorite drink" is in the document
  const inputElement3 = screen.getByLabelText(/Favorite drink/i)
  expect(inputElement3).toBeInTheDocument()

  // 16 - User fills the field with "Bière"
  const inputElement4 = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(inputElement4, 'Bière')
  expect(inputElement4.value).toBe('Bière')

  // 17 - A link "Review" is in the document
  const linkElement6 = screen.getByRole('link', {name: /Review/i})
  expect(linkElement6).toBeInTheDocument()

  // 18 - User clicks on the link "Review"
  userEvent.click(linkElement6)

  // 19 - User is redirected to the confirmation page
  await waitFor(() => {
    expect(window.location.href).toContain('/confirm')
  })

  // 20 - A heading "Confirm" is in the document
  const heading3 = await screen.findByRole('heading', {name: /Confirm/i})
  expect(heading3).toBeInTheDocument()

  // 21 - A text "Please confirm your choices" is in the document
  const textElement = screen.getByText(/Please confirm your choices/i)
  expect(textElement).toBeInTheDocument()

  // 22 - A text label "favorite food" has content ""
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText('Favorite Food')).toHaveTextContent(''),
  )

  // 23 - A text label "favorite drink" has content "Bière"
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText('Favorite Food')).toHaveTextContent('Bière'),
  )

  // 24 - A link "Go back" is in the document
  const linkElement8 = screen.getByRole('link', {name: /Go back/i})
  expect(linkElement8).toBeInTheDocument()

  // 25 - A button "Confirm" is in the document
  const buttonElement = screen.getByRole('button', {name: /Confirm/i})
  expect(buttonElement).toBeInTheDocument()

  // 26 - User clicks on the button "Confirm"
  userEvent.click(buttonElement)

  // 27 - User is redirected to the error page
  await waitFor(() => {
    expect(window.location.href).toContain('/error')
  })

  // 28 - A heading "Oh no. There was an error." is in the document
  await waitFor(() => {
    expect(screen.getByText(/Oh no. There was an error./i)).toBeInTheDocument()
  })

  // 29 - A text "les champs food et drink sont obligatoires" is in the document
  expect(
    screen.getByText(/les champs food et drink sont obligatoires/i),
  ).toBeInTheDocument()

  // 30 - A link "Go home" is in the document
  const linkElement9 = screen.getByRole('link', {name: /Go home/i})
  expect(linkElement9).toBeInTheDocument()

  // 31 - A link "Try again" is in the document
  const linkElement10 = screen.getByRole('link', {name: /Try again/i})
  expect(linkElement10).toBeInTheDocument()

  // 32 - User clicks on the link "Try again"
  userEvent.click(linkElement10)

  // 33 - User is redirected to page-1
  await waitFor(() => {
    expect(window.location.href).toContain('/page-1')
  })

  // 34 - A heading "Page 1" is in the document
  const heading4 = screen.getByRole('heading', {name: /Page 1/i})
  expect(heading4).toBeInTheDocument()
})
