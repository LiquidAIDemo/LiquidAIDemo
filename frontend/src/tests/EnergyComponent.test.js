import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'

test("renders name and type", () => {
  const eComponent = {
      name: 'Test name',
      type: 'Test type'
  }
  
  render(<EnergyComponent {...eComponent} />)

  const nameElement = screen.getByText('Test name')
  const typeElement = screen.getByText('Energy Test type')
  expect(nameElement).toBeInTheDocument()
  expect(typeElement).toBeInTheDocument()
  
})

test("renders 'Show more' button", () => {
  const eComponent = {
    name: 'Test name',
    type: 'Test type'
  }

  render(<EnergyComponent {...eComponent} />)
  const buttonElement = screen.getByText('Show more')
  expect(buttonElement).toBeInTheDocument()

})

