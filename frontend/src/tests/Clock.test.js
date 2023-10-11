import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, act, fireEvent } from '@testing-library/react'
import Clock from '../components/Clock'

test("renders content", () => {
    render(<Clock />)

    expect(screen.getByText(/Demo time:/)).toBeInTheDocument()
    expect(screen.getByText(/Real time:/)).toBeInTheDocument()
    expect(screen.getByText('Pause')).toBeInTheDocument()
})

test("demo time runs correctly", () => {
    jest.useFakeTimers()
    render(<Clock />)
    act(() => {
        jest.advanceTimersByTime(3000)
    })
    const demoTimeElement = screen.getByText(/Demo time:/)
    expect(demoTimeElement).toHaveTextContent(/Demo time: 3:00/)
    jest.useRealTimers()   
})

test("pause button pauses demo time", () => {
    jest.useFakeTimers()
    render(<Clock />)
    const pauseButtonElement = screen.getByText('Pause')
    
    fireEvent.click(pauseButtonElement)
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    
    const pausedDemoTime = screen.getByText(/Demo time:/)
    expect(pausedDemoTime).toHaveTextContent(/Demo time: 0:00/)
    jest.useRealTimers()
})