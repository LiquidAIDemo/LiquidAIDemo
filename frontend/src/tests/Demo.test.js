import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Demo from '../components/Demo'
import Welcome from '../components/Welcome'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

test("renders content", () => {
    render(
      <MemoryRouter>
        <Demo />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Main view')).toBeInTheDocument()
    expect(screen.getByText('Time')).toBeInTheDocument()
    expect(screen.getByText('Savings')).toBeInTheDocument()
    expect(screen.getByText('Stop')).toBeInTheDocument()
    expect(screen.getByText('Restart')).toBeInTheDocument()
})

test('"stop" button navigates to welcome page', () => {

    render(
      <MemoryRouter initialEntries={['/demo']}>
        <Routes>
          <Route path="/demo" element={<Demo />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </MemoryRouter>
    )
  
    const stopButtonElement = screen.getByText('Stop')
    fireEvent.click(stopButtonElement)
    const welcomePageElement = screen.getByText("Welcome to Liquid AI Demo!")
    expect(welcomePageElement).toBeInTheDocument()
  })

