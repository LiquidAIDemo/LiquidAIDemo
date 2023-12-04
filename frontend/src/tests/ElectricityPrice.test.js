import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import ElectricityPrice from "../components/ElectricityPrice"
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

const now = new Date()
now.setMinutes(0, 0)

test("renders content", async () => {
  const mockPrice = 5
  const mockConsumption = 2
  axiosMock.onGet(import.meta.env.PROD ? '/backend' : 'http://localhost:3001/').reply(200, [{ "price": mockPrice, "startDate": now.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" }) }])
  await act(async () => {
    render(
      <ElectricityPrice demoTime={now.toISOString()} demoPassedHrs={0} totalConsumption={[{hour: now.getHours(), value: mockConsumption}]}/>
    )
  })
  
  expect(screen.getByText(/Current price:/)).toHaveTextContent(mockPrice.toFixed(2))
  expect(screen.getByText(/Current consumption:/)).toHaveTextContent(mockConsumption.toFixed(2))
  expect(screen.getByText(/Total consumption:/)).toHaveTextContent(mockConsumption.toFixed(2))
})
