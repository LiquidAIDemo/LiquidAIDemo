import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnergyComponent from '../components/EnergyComponent'
import EnergyComponentPage from '../components/EnergyComponentPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const now = new Date()

const eComponent = {
  id: 1,
  name: 'Test name',
  type: 'Test type',
  description: 'Test description',
  demoTime: now
}

test("renders content correctly", () => {
  
  render(
    <MemoryRouter>
      <EnergyComponent {...eComponent} />
    </MemoryRouter>
  )
  
  expect(screen.getByText('Test name')).toBeInTheDocument()
  // expect(screen.getByText('Energy Test type')).toBeInTheDocument()
  expect(screen.getByText('Show more')).toBeInTheDocument()
  expect(screen.queryByText('Test description')).not.toBeInTheDocument()
})

test('"Show more" button navigates to component page', async () => {

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
  await userEvent.click(showMoreButtonElement)
  expect(screen.getByText(eComponent.description)).toBeInTheDocument()
})

