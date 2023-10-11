import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'
import { MemoryRouter } from 'react-router-dom'

test("renders name, type and 'Show more' button", () => {
  const eComponent = {
      id: 1,
      name: 'Test name',
      type: 'Test type',
      desciption: 'Test description'
  }
  
  render(
    <MemoryRouter>
      <EnergyComponent {...eComponent} />
    </MemoryRouter>
  )

  expect(screen.getByText('Test name')).toBeInTheDocument()
  expect(screen.getByText('Energy Test type')).toBeInTheDocument()
  expect(screen.getByText('Show more')).toBeInTheDocument()
  
})

