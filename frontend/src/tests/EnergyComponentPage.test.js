import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnergyComponentPage from '../components/EnergyComponentPage'
import Demo from '../components/Demo'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

const eComponent = {
  id: 1,
  name: 'Test name',
  type: 'Test type',
  description: 'Test description'
}

const componentPagePath = `/component/${eComponent.id}`

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { component: eComponent }
  })
}))

test("renders content correctly", () => {

  render(
    <MemoryRouter initialEntries={[componentPagePath]}>
      <Routes>
        <Route path={componentPagePath} element={<EnergyComponentPage />} />
      </Routes>
    </MemoryRouter>
  )
  
  expect(screen.getByText('Test name')).toBeInTheDocument()
  expect(screen.getByText('Test description')).toBeInTheDocument()
  expect(screen.getByText('Back to demo')).toBeInTheDocument()
})

test("'back to demo' button returns to demo", async () => {
  axiosMock.onGet('/api').reply(200, [{ price: 0 }])
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

  const backToDemoButtonElement = screen.getByText('Back to demo')
  await act(async () => {
    await userEvent.click(backToDemoButtonElement)
  })
  expect(screen.getByText("Liquid AI demo")).toBeInTheDocument()
})