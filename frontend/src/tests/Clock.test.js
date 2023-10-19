import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, act, fireEvent } from '@testing-library/react'
import Clock from '../components/Clock'

const now = new Date()

test("renders content", () => {
    render(<Clock />)

    expect(screen.getByText(/Select speed:/)).toBeInTheDocument()
    expect(screen.getByText(/Select time range:/)).toBeInTheDocument()
    expect(screen.getByText(/Demo:/)).toBeInTheDocument()
    expect(screen.getByText(/Current/)).toBeInTheDocument()
    expect(screen.getByText('Pause')).toBeInTheDocument()
    expect(screen.getByText('Reset')).toBeInTheDocument()
})

test("demo time runs correctly", () => {
    jest.useFakeTimers()
    render(<Clock />)
    act(() => {
        jest.advanceTimersByTime(3000)
    })
    const demoTimeElement = screen.getByText(/Demo:/).parentElement
    const currentHrs = now.getHours()
    expect(demoTimeElement).toHaveTextContent(`Demo: ${(currentHrs + 3) % 24}:00`)
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
    
    const pausedDemoTime = screen.getByText(/Demo:/).parentElement
    const currentHrs = now.getHours()
    expect(pausedDemoTime).toHaveTextContent(`Demo: ${currentHrs}:00`)
    jest.useRealTimers()
})