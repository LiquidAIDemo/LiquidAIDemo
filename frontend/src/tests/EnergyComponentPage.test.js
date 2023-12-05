import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnergyComponentPage from '../components/EnergyComponentPage'
import Demo from '../components/Demo'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)
const now = new Date()

const consumerComponent = {
  id: 'heat-pump',
  name: 'Heat pump',
  type: 'consumer',
  description: 'Heat pump is used to adjust the temperature inside the house.',
  demoTime: {demoTime: now},
  demoStartTime: {demoStartTime: now.getTime()}
}

const producerComponent = {
  id: 'solar-panel-1', 
  name: 'Solar panel 1',
  type: 'producer',
  description: 'Solar panels turn sunlight into energy.',
  demoTime: {demoTime: now},
  demoStartTime: {demoStartTime: now.getTime()}
}

const electricBoard = {
  id: 'electric-board', 
  name: 'Electric board',
  type: 'producer',
  description: 'Electric board represents electricity coming from outside the house to balance energy production and consumption.',
  demoTime: {demoTime: now},
  netConsumption: {netConsumption: [{hour: now.getHours(), value: 3}]},
  visibleComponents: {visibleComponents: [{id: "heat-pump", visibility: true}, {id: "solar-panel-1", visibility: true}]},
  demoStartTime: {demoStartTime: now.getTime()}
}

const optimizerComponent = {
  id: "optimizer", 
  name: "Optimizer",
  type: "optimizer",
  description: "Optimizer desc",
  demoTime: {demoTime: now},
  demoStartTime: {demoStartTime: now.getTime()}
}

let mockComponent = consumerComponent
let componentPagePath = `/component/${mockComponent.id}`

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { component: mockComponent }
  })
}))

test("renders consumer component correctly", async () => {
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[componentPagePath]}>
        <Routes>
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText(`${consumerComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText(`${consumerComponent.description}`)).toBeInTheDocument()
  expect(screen.getByText('Back')).toBeInTheDocument()
})

test("renders producer component correctly", async () => {
  mockComponent = producerComponent
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[componentPagePath]}>
        <Routes>
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText(`${producerComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText(`${producerComponent.description}`)).toBeInTheDocument()
  expect(screen.getByText('Back')).toBeInTheDocument()
})

test("renders electric board correctly", async () => {
  mockComponent = electricBoard
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[componentPagePath]}>
        <Routes>
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText(`${electricBoard.name}`)).toBeInTheDocument()
  expect(screen.getByText(`${electricBoard.description}`)).toBeInTheDocument()
  expect(screen.getByText('Back')).toBeInTheDocument()
})

test("renders optimizer component correctly", async () => {
  mockComponent = optimizerComponent
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[componentPagePath]}>
        <Routes>
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText(`${optimizerComponent.name}`)).toBeInTheDocument()
  expect(screen.getByText(`${optimizerComponent.description}`)).toBeInTheDocument()
  expect(screen.getByText('Back')).toBeInTheDocument()
})

test("'back' button returns to demo", async () => {
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[componentPagePath]}>
        <Routes>
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </MemoryRouter>
    )
  })

  const backToDemoButtonElement = screen.getByText('Back')
  await act(async () => {
    await userEvent.click(backToDemoButtonElement)
  })
  expect(screen.getByText("Manage components")).toBeInTheDocument()
})