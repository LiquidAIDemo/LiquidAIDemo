import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'

test("renders name, type and 'Show more' button", () => {
  const eComponent = {
      name: 'Test name',
      type: 'Test type'
  }
  
  render(<EnergyComponent {...eComponent} />)

  expect(screen.getByText('Test name')).toBeInTheDocument()
  expect(screen.getByText('Energy Test type')).toBeInTheDocument()
  expect(screen.getByText('Show more')).toBeInTheDocument()
  
})

