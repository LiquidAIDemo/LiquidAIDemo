import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import EnergyComponent from '../components/EnergyComponent'
import EnergyComponentPage from '../components/EnergyComponentPage'
import HeatPump from '../components/visual_components/HeatPump'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const now = new Date()
const user = userEvent.setup({delay: null})

const consumerComponent = {
  id: 'heat-pump',
  name: 'Heat pump',
  type: 'consumer',
  nature: 'constant',
  description: 'Heat pump is used to adjust the temperature inside the house.',
  demoTime: now
}

const producerComponent = {
  id: 'solar-panel-1', 
  name: 'Solar panel 1',
  type: 'producer',
  nature: 'constant_producer',
  description: 'Solar panels turn sunlight into energy.',
  demoTime: now
}

const electricBoard = {
  id: 'electric-board', 
  name: 'Electric board',
  type: 'producer',
  nature: 'constant_producer',
  description: 'Electric board represents electricity coming from outside the house to balance energy production and consumption.',
  demoTime: now,
  netConsumption: [{hour: now.getHours(), value: 3}],
  visibleComponents: [{id: "heat-pump", visibility: true}, {id: "solar-panel-1", visibility: true}]
}

test("renders consumer component correctly", () => { 
  render(
    <EnergyComponent {...consumerComponent} />
  )
  
  expect(screen.getByText(`${consumerComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText(`(Energy ${consumerComponent.type})`)).toBeInTheDocument()
  expect(screen.getByText('Click the component for more info')).toBeInTheDocument()
  expect(screen.queryByText(`${consumerComponent.description}`)).not.toBeInTheDocument()
})

test("renders producer component correctly", () => {
  render(
    <EnergyComponent {...producerComponent} />
  )
  
  expect(screen.getByText(`${producerComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText(`(Energy ${producerComponent.type})`)).toBeInTheDocument()
  expect(screen.getByText('Click the component for more info')).toBeInTheDocument()
  expect(screen.queryByText(`${producerComponent.description}`)).not.toBeInTheDocument()
})

test("renders electric board correctly", () => {
  render(
    <EnergyComponent {...electricBoard} />
  )
  
  expect(screen.getByText(`${electricBoard.name}`)).toBeInTheDocument()
  expect(screen.getByText(`(Energy ${electricBoard.type})`)).toBeInTheDocument()
  expect(screen.getByText('Click the component for more info')).toBeInTheDocument()
  expect(screen.queryByText(`${electricBoard.description}`)).not.toBeInTheDocument()
})

test('Clicking component navigates to component page', async () => {

  const componentPagePath = `/component/${consumerComponent.id}`
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
  expect(screen.getByText(consumerComponent.description)).toBeInTheDocument()
})

test('Hovering over component shows info about component', async () => {
  render(
    <MemoryRouter>
      <HeatPump demoTime={now.toISOString()} demoStartTime={now.toISOString()} />
    </MemoryRouter>
  )
  const eComponentImage = screen.getByAltText("heatPump")
  await user.hover(eComponentImage)
  expect(screen.getByText(`${consumerComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText('Click the component for more info')).toBeInTheDocument()
}) 

