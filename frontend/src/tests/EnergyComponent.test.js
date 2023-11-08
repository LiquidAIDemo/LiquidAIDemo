import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'
import { MemoryRouter } from 'react-router-dom'

const now = new Date()

const eComponent = {
  id: 'heat-pump',
  name: 'Heat Pump',
  type: 'consumer',
  description: 'Test description',
  demoTime: now
}

test("renders content correctly", () => {
  
  render(
    <MemoryRouter>
      <EnergyComponent {...eComponent} />
    </MemoryRouter>
  )
  
  expect(screen.getByText(`${eComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText(`(Energy ${eComponent.type})`)).toBeInTheDocument()
  expect(screen.getByText('Click the component for more info')).toBeInTheDocument()
  expect(screen.queryByText(`${eComponent.description}`)).not.toBeInTheDocument()
})

