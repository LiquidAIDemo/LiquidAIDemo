import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../components/Welcome'
import Demo from '../components/Demo'

test("'Start demo' button works correctly", () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </MemoryRouter>
  )
  
  const startButtonElement = screen.getByText('Start demo')
  fireEvent.click(startButtonElement)
  expect(screen.getByText("Main view")).toBeInTheDocument()
})