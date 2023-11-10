import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../components/Welcome'
import Demo from '../components/Demo'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

test("'Start demo' button works correctly", async () => {
  axiosMock.onGet('/api').reply(200, [{ price: 0 }])
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </MemoryRouter>
  )
  
  const startButtonElement = screen.getByText('start')
  await userEvent.click(startButtonElement)
  expect(screen.getByText("Components")).toBeInTheDocument()
})