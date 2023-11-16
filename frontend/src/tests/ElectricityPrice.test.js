import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ElectricityPrice from "../components/ElectricityPrice"

const now = new Date()

test("renders content", async () => {
  render(
    <ElectricityPrice demoTime={now.toISOString()} demoPassedHrs={0} totalConsumption={[{hour: now.getHours(), value: 2}]}/>
  )
  screen.debug()
})
