import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../components/NotFound'
import Demo from '../components/Demo'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

test("'back to demo' button returns to demo", async () => {
  axiosMock.onGet('/api').reply(200, [{ price: 0 }])
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

  const backToDemoButtonElement = screen.getByText('back to demo')
  await act(async () => {
    await userEvent.click(backToDemoButtonElement)
  })
  expect(screen.getByText("Components")).toBeInTheDocument()
})