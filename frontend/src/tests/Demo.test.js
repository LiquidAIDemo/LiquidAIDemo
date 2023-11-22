import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Demo from '../components/Demo'
import Welcome from '../components/Welcome'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)
const user = userEvent.setup({delay: null})
const now = new Date()

test("renders content", async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act( async () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText('Components')).toBeInTheDocument()
  expect(screen.getByText('Savings')).toBeInTheDocument()
  expect(screen.getByText('Back')).toBeInTheDocument()
  expect(screen.getByText('Information')).toBeInTheDocument()
})

test('"back" button navigates to welcome page', async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act( async () => {
    render(
      <MemoryRouter initialEntries={['/demo']}>
        <Routes>
          <Route path="/demo" element={<Demo />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  const stopButtonElement = screen.getByText('Back')
  await user.click(stopButtonElement)
  const welcomePageElement = screen.getByText("Welcome to Energy Optimizer demonstrator")
  expect(welcomePageElement).toBeInTheDocument()
})

test('components menu initializes correctly and checkboxes work correctly', async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act( async () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    )
  })

  const componentsMenuElement = screen.getByTestId("ExpandMoreIcon")
  await user.click(componentsMenuElement)
  const checkboxes = [
    screen.getByLabelText('Heat Pump'),
    screen.getByLabelText('Electric board'),
    screen.getByLabelText('Fridge & Freezer'),
    screen.getByLabelText('Heater'),
    screen.getByLabelText('Hot water heater'),
    screen.getByLabelText('Stove'),
    screen.getByLabelText('Washing machine'),
    screen.getByLabelText('Electric car 1'),
    screen.getByLabelText('Electric car 2'),
    screen.getByLabelText('Solar panel 1'),
    screen.getByLabelText('Solar panel 2'),
    screen.getByLabelText('Solar panel 3'),
    screen.getByLabelText('Solar panel 4'),
    screen.getByLabelText('Jacuzzi'),
  ]
  
  // Check if all checkboxes are checked by default
  checkboxes.forEach(cb => {
    expect(cb).toBeChecked()
  })
  // Test checkbox functionality with Heat Pump
  const heatPumpCheckbox = screen.getByLabelText("Heat Pump")
  expect(heatPumpCheckbox.checked).toBe(true)
  await user.click(heatPumpCheckbox)
  expect(heatPumpCheckbox.checked).toBe(false)
})

test('"Clear all" and "Reset to default" buttons work correctly', async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act( async () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    )
  })

  const componentsMenuElement = screen.getByTestId("ExpandMoreIcon")
  await user.click(componentsMenuElement)
  const checkboxes = [
    screen.getByLabelText('Heat Pump'),
    screen.getByLabelText('Electric board'),
    screen.getByLabelText('Fridge & Freezer'),
    screen.getByLabelText('Heater'),
    screen.getByLabelText('Hot water heater'),
    screen.getByLabelText('Stove'),
    screen.getByLabelText('Washing machine'),
    screen.getByLabelText('Electric car 1'),
    screen.getByLabelText('Electric car 2'),
    screen.getByLabelText('Solar panel 1'),
    screen.getByLabelText('Solar panel 2'),
    screen.getByLabelText('Solar panel 3'),
    screen.getByLabelText('Solar panel 4'),
    screen.getByLabelText('Jacuzzi'),
  ]
  
  const clearAllButton = screen.getByText("Clear all")
  await user.click(clearAllButton)

  checkboxes.forEach(cb => {
    expect(cb).not.toBeChecked()
  })

  const resetButton = screen.getByText("Select all")
  await user.click(resetButton)

  checkboxes.forEach(cb => {
    expect(cb).toBeChecked()
  })
})

test('"Information" button works correctly', async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act( async () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    )
  })

  const informationButton = screen.getByText("Information")
  await user.click(informationButton)
  expect(screen.getByText("Instructions for use")).toBeInTheDocument()
})
