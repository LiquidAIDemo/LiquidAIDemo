import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnergyComponentPage from '../components/EnergyComponentPage'
import Demo from '../components/Demo'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)
const now = new Date()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      component: {
        id: 'heat-pump',
        name: 'Heat Pump',
        type: 'consumer',
        description: 'Test description',
        demoTime: new Date(),
        netConsumption: [{ hour: new Date().getHours(), value: 3 }],
        visibleComponents: [{ id: "heat-pump", visibility: true }]
      }
    }
  })
}))

const mockLocation = useLocation()
const componentPagePath = `/component/${mockLocation.state.component.id}`

test("renders content correctly", async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[componentPagePath]}>
        <Routes>
          <Route path={componentPagePath} element={<EnergyComponentPage />} />
        </Routes>
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText(`${mockLocation.state.component.name}`)).toBeInTheDocument()
  expect(screen.getByText(`${mockLocation.state.component.description}`)).toBeInTheDocument()
  expect(screen.getByText('Back')).toBeInTheDocument()
})

test("'back to demo' button returns to demo", async () => {
  axiosMock.onGet('/api').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
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
  expect(screen.getByText("Components")).toBeInTheDocument()
})