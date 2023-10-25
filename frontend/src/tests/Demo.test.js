import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Demo from '../components/Demo'
import Welcome from '../components/Welcome'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

test("renders content", async () => {
  axiosMock.onGet('/api').reply(200, { price: 0 })
  await act( async () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    )
  })
  
  expect(screen.getByText('Liquid AI demo')).toBeInTheDocument()
  expect(screen.getByText('Time')).toBeInTheDocument()
  expect(screen.getByText('Savings')).toBeInTheDocument()
  expect(screen.getByText('Stop')).toBeInTheDocument()
})

test('"stop" button navigates to welcome page', async () => {
  axiosMock.onGet('/api').reply(200, { price: 0 })
  render(
    <MemoryRouter initialEntries={['/demo']}>
      <Routes>
        <Route path="/demo" element={<Demo />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </MemoryRouter>
  )
  
  const user = userEvent.setup({delay: null})
  const stopButtonElement = screen.getByText('Stop')
  await user.click(stopButtonElement)
  const welcomePageElement = screen.getByText("Welcome to Liquid AI Demo!")
  expect(welcomePageElement).toBeInTheDocument()
})

