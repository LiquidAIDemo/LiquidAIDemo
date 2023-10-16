import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'
import EnergyComponentPage from '../components/EnergyComponentPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

test("renders content correctly", () => {
  const eComponent = {
      id: 1,
      name: 'Test name',
      type: 'Test type',
      description: 'Test description'
  }
  
  render(
    <MemoryRouter>
      <EnergyComponent {...eComponent} />
    </MemoryRouter>
  )
  
  expect(screen.getByText('Test name')).toBeInTheDocument()
  expect(screen.getByText('Energy Test type')).toBeInTheDocument()
  expect(screen.getByText('Show more')).toBeInTheDocument()
  expect(screen.queryByText('Test description')).not.toBeInTheDocument()
})

test('"Show more" button navigates to component page', () => {

  const eComponent = {
    id: 1,
    name: 'Test name',
    type: 'Test type',
    description: 'Test description'
  }
  const componentPagePath = `/component/${eComponent.id}`
  
  render(
    <MemoryRouter initialEntries={['/demo']}>
      <Routes>
        <Route path="/demo" element={<EnergyComponent {...eComponent} />} />
        <Route path={componentPagePath} element={<EnergyComponentPage />} />
      </Routes>
    </MemoryRouter>
  )

  const showMoreButtonElement = screen.getByText('Show more')
  fireEvent.click(showMoreButtonElement)
  const componentPageElement = screen.getByText(eComponent.description)
  expect(componentPageElement).toBeInTheDocument()
})

