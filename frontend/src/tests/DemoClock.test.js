import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'
import DemoClock from '../components/DemoClock'

const now = new Date()
const user = userEvent.setup({delay: null})

test("renders content", () => {
  render(<DemoClock demoTime={now.toISOString()} demoPassedHours={0} onDemoTimeChange={jest.fn()}/>)

  expect(screen.getByText(/Speed:/)).toBeInTheDocument()
  expect(screen.getByText(/Time range:/)).toBeInTheDocument()
  expect(screen.getByText(/Demo time:/)).toBeInTheDocument()
  expect(screen.getByText('Start')).toBeInTheDocument()
})

test("demo time runs correctly", async () => {
  jest.useFakeTimers()
  render(<DemoClock demoTime={now.toISOString()} demoPassedHours={0} onDemoTimeChange={jest.fn()}/>)
  const startButtonElement = screen.getByText('Start')
  await user.click(startButtonElement)
  act(() => {
    jest.advanceTimersByTime(1000)
  })
  const demoTimeElement = screen.getByText(/Demo time:/).parentElement
  const currentHrs = String(now.getHours()).padStart(2, '0')
  expect(demoTimeElement).toHaveTextContent(`Demo time: ${currentHrs}:10`)
  jest.useRealTimers()
})

test("pause button pauses demo time", async () => {
  jest.useFakeTimers()
  render(<DemoClock demoTime={now.toISOString()} demoPassedHours={0} onDemoTimeChange={jest.fn()}/>)
  const startButtonElement = screen.getByText('Start')
  await user.click(startButtonElement)
  act(() => {
    jest.advanceTimersByTime(1000)
  })
  
  const pauseButtonElement = screen.getByText('Pause')
  await user.click(pauseButtonElement)
  act(() => {
    jest.advanceTimersByTime(2000)
  })
  
  const pausedDemoTime = screen.getByText(/Demo time:/).parentElement
  const currentHrs = String(now.getHours()).padStart(2, '0')
  expect(pausedDemoTime).toHaveTextContent(`Demo time: ${currentHrs}:10`)
  jest.useRealTimers()
})

test("restart button restarts demo time", async () => {
  jest.useFakeTimers()
  render(<DemoClock demoTime={now.toISOString()} demoPassedHours={0} onDemoTimeChange={jest.fn()}/>)
  const startButtonElement = screen.getByText('Start')
  await user.click(startButtonElement)
  const restartButtonElement = screen.getByText('Restart')
  
  act(() => {
    jest.advanceTimersByTime(2000)
  })
  await user.click(restartButtonElement)
  
  const restartedDemoTime = screen.getByText(/Demo time:/).parentElement
  const currentHrs = String(now.getHours()).padStart(2, '0')
  expect(restartedDemoTime).toHaveTextContent(`Demo time: ${currentHrs}:00`)
  jest.useRealTimers()
})

test("selecting time range works correctly", async () => {
  render(
    <DemoClock demoTime={now.toISOString()} demoPassedHours={0} onDemoTimeChange={jest.fn()}/>
  )
  
  const timeRangeDropdown = within(screen.getByTestId('time_range')).getByRole("combobox")
  await user.click(timeRangeDropdown)
  
  const listbox = screen.getByRole("listbox")
  const options = within(listbox).getAllByRole("option")
  const optionValues = options.map((li) => li.getAttribute('data-value'))
  expect(optionValues).toEqual(['next', 'last'])
  
  await user.click(options[1])
  const timeRangeElementAfterClick = screen.getByText(/Time range:/)
  expect(timeRangeElementAfterClick).toHaveTextContent("Last 24 h")
})

test("selecting speed works correctly", async () => {
  render(
    <DemoClock demoTime={now.toISOString()} demoPassedHours={0} onDemoTimeChange={jest.fn()}/>
  )
  
  const speedDropdown = within(screen.getByTestId('speed')).getByRole("combobox")
  await user.click(speedDropdown)
  
  const listbox = screen.getByRole("listbox")
  const options = within(listbox).getAllByRole("option")
  const optionValues = options.map((li) => parseFloat(li.getAttribute('data-value')))
  
  expect(optionValues).toEqual([1000, 1000/2, 1000/3, 1000/6])
  await user.click(options[2])
  
  const speedElementAfterClick = screen.getByText(/Speed:/)
  expect(speedElementAfterClick).toHaveTextContent("30 min / sec")
})