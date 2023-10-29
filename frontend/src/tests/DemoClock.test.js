import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'
import DemoClock from '../components/DemoClock'
import { MenuItem, Select } from '@mui/material';

const now = new Date()
const user = userEvent.setup({delay: null})

test("renders content", () => {
  render(<DemoClock onDemoTimeChange={jest.fn()}/>)

  expect(screen.getByText(/Select speed:/)).toBeInTheDocument()
  expect(screen.getByText(/Select time range:/)).toBeInTheDocument()
  expect(screen.getByText(/Demo:/)).toBeInTheDocument()
  expect(screen.getByText('Pause')).toBeInTheDocument()
  expect(screen.getByText('Restart')).toBeInTheDocument()
})

test("demo time runs correctly", () => {
  jest.useFakeTimers()
  render(<DemoClock onDemoTimeChange={jest.fn()}/>)
  act(() => {
    jest.advanceTimersByTime(3000)
  })
  const demoTimeElement = screen.getByText(/Demo:/).parentElement
  const currentHrs = now.getHours()
  expect(demoTimeElement).toHaveTextContent(`Demo: ${(currentHrs + 3) % 24}:00`)
  jest.useRealTimers()
})

test("pause button pauses demo time", async () => {
  jest.useFakeTimers()
  render(<DemoClock onDemoTimeChange={jest.fn()}/>)
  const pauseButtonElement = screen.getByText('Pause')
  
  await user.click(pauseButtonElement)
  act(() => {
    jest.advanceTimersByTime(2000)
  })
  
  const pausedDemoTime = screen.getByText(/Demo:/).parentElement
  const currentHrs = now.getHours()
  expect(pausedDemoTime).toHaveTextContent(`Demo: ${currentHrs}:00`)
  jest.useRealTimers()
})

test("restart button restarts demo time", async () => {
  jest.useFakeTimers()
  render(<DemoClock onDemoTimeChange={jest.fn()}/>)
  const restartButtonElement = screen.getByText('Restart')
  
  act(() => {
    jest.advanceTimersByTime(2000)
  })
  await user.click(restartButtonElement)
  
  const restartedDemoTime = screen.getByText(/Demo:/).parentElement
  const currentHrs = now.getHours()
  expect(restartedDemoTime).toHaveTextContent(`Demo: ${currentHrs}:00`)
  jest.useRealTimers()
})

test("selecting time range works correctly", async () => {
  const spyOnSelectChange = jest.fn()
  render(
    <div>
      <Select
        value={"next"}
        onChange={(e) => spyOnSelectChange(e.target.value)}
        data-testid="time_range"
        name='time'
        sx={{width: '140px', height: '30px'}}
      >
        <MenuItem value={"next"}>Next 24h</MenuItem>
        <MenuItem value={"last"}>Last 24h</MenuItem>
      </Select>
    </div>
  )
  
  const timeRangeDropdown = within(screen.getByTestId('time_range')).getByRole("combobox")
  await user.click(timeRangeDropdown)
  
  const listbox = screen.getByRole("listbox")
  const options = within(listbox).getAllByRole("option")
  const optionValues = options.map((li) => li.getAttribute('data-value'))
  expect(optionValues).toEqual(['next', 'last'])
  
  await user.click(options[1])
  expect(spyOnSelectChange).toHaveBeenCalledWith('last')
})