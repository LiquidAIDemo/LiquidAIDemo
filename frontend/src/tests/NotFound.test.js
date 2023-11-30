import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../components/NotFound'
import Demo from '../components/Demo'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)
const now = new Date()

test("'back to demo' button returns to demo", async () => {
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": 5, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/nonexistingpath']}>
        <Routes>
          <Route path='/nonexistingpath' element={<NotFound />}/>
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </MemoryRouter>
    )
  })

  const backToDemoButtonElement = screen.getByText('Back to demo')
  await act(async () => {
    await userEvent.click(backToDemoButtonElement)
  })
  expect(screen.getByText("Components")).toBeInTheDocument()
})