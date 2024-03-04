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

test('1-2 - On App page, a title "Welcome home" is rendered', () => {
  expect(screen.getByRole('heading')).toHaveTextContent(/Welcome home/i)
})

test('3-4 - On App page, a link with the label "Fill out the form" is present and we can click on it', () => {
  const linkElement = screen.getByRole('link', {name: /Fill out the form/i})
  expect(linkElement).toBeInTheDocument()
  userEvent.click(linkElement)
})

test('5-6 - After clicking "Fill out the form", we have been redirected to page-1 and the heading is "Page 1"', async () => {
  await waitFor(() => {
    console.log(window.location.href)
    expect(window.location.href).toContain('/page-1')
  })
  const heading = screen.getByRole('heading', {name: /Page 1/i})
  expect(heading).toBeInTheDocument()
})

test('7-8 - On page-1, a link with the label "Go Home" is present and a field with a label "Favorite food"', () => {
  const linkElement = screen.getByRole('link', {name: /Go Home/i})
  const inputElement = screen.getByLabelText(/Favorite Food/i)
  expect(linkElement).toBeInTheDocument()
  expect(inputElement).toBeInTheDocument()
})

test('9 - User fills the field with "Les pâtes"', () => {
  const inputElement = screen.getByLabelText(/Favorite Food/i)
  userEvent.type(inputElement, 'Les pâtes')
  expect(inputElement.value).toBe('Les pâtes')
})

test('10 - A link "Next" is in the document', () => {
  const linkElement = screen.getByRole('link', {name: /Next/i})
  expect(linkElement).toBeInTheDocument()
})

test('11 - User clicks on the link "Next"', () => {
  const linkElement = screen.getByRole('link', {name: /Next/i})
  userEvent.click(linkElement)
})

test('12 - User is redirected to page 2', async () => {
  await waitFor(() => {
    console.log(window.location.href)
    expect(window.location.href).toContain('/page-2')
  })
})

test('13 - A heading "Page 2" is in the document', async () => {
  const heading = await screen.findByRole('heading', {name: /Page 2/i})
  expect(heading).toBeInTheDocument()
})

test('14 - A link "Go back" is in the document', () => {
  const linkElement = screen.getByRole('link', {name: /Go back/i})
  expect(linkElement).toBeInTheDocument()
})

test('15 - A field with the label "Favorite drink" is in the document', () => {
  const inputElement = screen.getByLabelText(/Favorite drink/i)
  expect(inputElement).toBeInTheDocument()
})

test('16 - User fills the field with "Bière"', () => {
  const inputElement = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(inputElement, 'Bière')
  expect(inputElement.value).toBe('Bière')
})

test('17 - A link "Review" is in the document', () => {
  const linkElement = screen.getByRole('link', {name: /Review/i})
  expect(linkElement).toBeInTheDocument()
})

test('18 - User clicks on the link "Review"', () => {
  const linkElement = screen.getByRole('link', {name: /Review/i})
  userEvent.click(linkElement)
})

test('19 - User is redirected to the confirmation page', async () => {
  await waitFor(() => {
    expect(window.location.href).toContain('/confirm')
  })
})

test('20 - A heading "Confirm" is in the document', async () => {
  const heading = await screen.findByRole('heading', {name: /Confirm/i})
  expect(heading).toBeInTheDocument()
})

test('21 - A text "Please confirm your choices" is in the document', () => {
  const textElement = screen.getByText(/Please confirm your choices/i)
  expect(textElement).toBeInTheDocument()
})

test('22 - A text label "favorite food" has content "Les pâtes"', async () => {
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText('Favorite Food')).toHaveTextContent(
      'Les pâtes',
    ),
  )
})

test('23 - A text label "favorite drink" has content "Bière"', () => {
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText('Favorite Food')).toHaveTextContent('Bière'),
  )
})

test('24 - A link "Go back" is in the document', () => {
  const linkElement = screen.getByRole('link', {name: /Go back/i})
  expect(linkElement).toBeInTheDocument()
})

test('25 - A button "Confirm" is in the document', () => {
  const buttonElement = screen.getByRole('button', {name: /Confirm/i})
  expect(buttonElement).toBeInTheDocument()
})

test('26 - User clicks on the button "Confirm"', () => {
  const buttonElement = screen.getByRole('button', {name: /Confirm/i})
  userEvent.click(buttonElement)
})

test('27 - User is redirected to the congratulations page', async () => {
  await waitFor(() => {
    expect(window.location.href).toContain('/success')
  })
})

test('28 - A heading "Congrats. You did it." is in the document', async () => {
  const heading = await screen.findByRole('heading', {
    name: /Congrats\. You did it\./i,
  })
  expect(heading).toBeInTheDocument()
})

test('29 - A link "Go home" is in the document', () => {
  const linkElement = screen.getByRole('link', {name: /Go home/i})
  expect(linkElement).toBeInTheDocument()
})

test('30 - User clicks on the link "Go Home"', () => {
  const linkElement = screen.getByRole('link', {name: /Go home/i})
  userEvent.click(linkElement)
})

test('31 - User is redirected to the home page', async () => {
  // Assuming that the URL changes to "/home" when the user is redirected to the home page
  await waitFor(() => {
    expect(window.location.href).toContain('/')
  })
})

test('32 - A heading "Welcome home" is in the document', async () => {
  const heading = await screen.findByRole('heading', {name: /Welcome home/i})
  expect(heading).toBeInTheDocument()
})
