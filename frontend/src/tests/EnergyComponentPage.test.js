import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import EnergyComponentPage from '../components/EnergyComponentPage'
import Demo from '../components/Demo'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const eComponent = {
  id: 1,
  name: 'Test name',
  type: 'Test type',
  description: 'Test description'
}

const componentPagePath = `/component/${eComponent.id}`

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { component: eComponent }
  })
}))

test("renders content correctly", () => {

  render(
    <MemoryRouter initialEntries={[componentPagePath]}>
      <Routes>
        <Route path={componentPagePath} element={<EnergyComponentPage />} />
      </Routes>
    </MemoryRouter>
  )
  
  expect(screen.getByText('Test name')).toBeInTheDocument()
  expect(screen.getByText('Test description')).toBeInTheDocument()
  expect(screen.getByText('Back to demo')).toBeInTheDocument()
})

test("'back to demo' button returns to demo", () => {
  render(
    <MemoryRouter initialEntries={[componentPagePath]}>
      <Routes>
        <Route path={componentPagePath} element={<EnergyComponentPage />} />
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </MemoryRouter>
  )

  const backToDemoButtonElement = screen.getByText('Back to demo')
  fireEvent.click(backToDemoButtonElement)
  expect(screen.getByText("Main view")).toBeInTheDocument()
})