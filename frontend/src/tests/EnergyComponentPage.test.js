import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import EnergyComponentPage from '../components/EnergyComponentPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const eComponent = {
  id: 1,
  name: 'Test name',
  type: 'Test type',
  description: 'Test description'
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { component: eComponent }
  })
}))

test("renders content correctly", () => {
  
  const componentPagePath = `/component/${eComponent.id}`

  render(
    <MemoryRouter initialEntries={[componentPagePath]}>
      <Routes>
        <Route path={componentPagePath} element={<EnergyComponentPage />} />
      </Routes>
    </MemoryRouter>
  )
  
  expect(screen.getByText('Test name')).toBeInTheDocument()
  expect(screen.queryByText('Test description')).toBeInTheDocument()
  expect(screen.getByText('Back to demo')).toBeInTheDocument()
})