import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'
import EnergyComponentPage from '../components/EnergyComponentPage'
import HeatPump from '../components/visual_components/HeatPump'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const now = new Date()
const user = userEvent.setup({delay: null})

const eComponent = {
  id: 'heat-pump',
  name: 'Heat pump',
  type: 'consumer',
  description: 'Heat pump is used to adjust the temperature inside the house.',
  demoTime: now,
  netConsumption: [{hour: now.getHours(), value: 3}],
  visibleComponents: [{id: "heat-pump", visibility: true}]
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

test('Clicking component navigates to component page', async () => {

  const componentPagePath = `/component/${eComponent.id}`
  await act( async () => {
    render(
      <MemoryRouter initialEntries={['/demo']}>
        <Routes>
          <Route path="/demo" element={<HeatPump demoTime={now.toISOString()} demoStartTime={now.toISOString()} />} />
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  const eComponentImage = screen.getByAltText("heatPump")
  await user.click(eComponentImage)
  expect(screen.getByText(eComponent.description)).toBeInTheDocument()
})

test('Hovering over component shows info about component', async () => {
  render(
    <MemoryRouter>
      <HeatPump demoTime={now.toISOString()} demoStartTime={now.toISOString()} />
    </MemoryRouter>
  )
  const eComponentImage = screen.getByAltText("heatPump")
  await user.hover(eComponentImage)
  expect(screen.getByText(`${eComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText('Click the component for more info')).toBeInTheDocument()
}) 

