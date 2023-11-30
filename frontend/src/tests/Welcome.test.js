import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../components/Welcome'
import Demo from '../components/Demo'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)
const now = new Date()

test("'Start demo' button works correctly", async () => {
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </MemoryRouter>
  )
  
  const startButtonElement = screen.getByText('Start')
  await userEvent.click(startButtonElement)
  expect(screen.getByText("Components")).toBeInTheDocument()
})