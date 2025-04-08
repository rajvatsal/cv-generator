import { Dispatch, SetStateAction, useState } from 'react'
import './Range.scss'
//
// TODO: Make this shit more easy to read
//

interface RangeProps {
  min: number
  max: number
  step: number
  value: number
  name: string
  suffix: string
  onChange: Dispatch<SetStateAction<number>>
}

interface RangeWheelHandler {
  min: number
  max: number
  step: number
  rangeValue: number
  setRangeValue: Dispatch<SetStateAction<number>>
  onChange: Dispatch<SetStateAction<number>>
}

const getCssVars = (element: HTMLElement, variable: string) =>
  getComputedStyle(element).getPropertyValue(variable)

const primaryColor = getCssVars(
  document.documentElement,
  '--clr-ip--range-primary-dark'
)

const accentColor = getCssVars(
  document.documentElement,
  '--clr-ip--range-primary-light'
)

const rangeThumbHeight = getCssVars(
  document.documentElement,
  '--ip-range-thumb-height'
)
  .split('.')
  .map((i) => i.replace(/\D/g, ''))
  .join('.')

function getProgressOffset(percentValue: number, thumbHeight: number) {
  const isOver = percentValue > 50
  if (isOver) {
    const marginPercent = percentValue - 50
    return ` - ${(marginPercent / 100) * thumbHeight}`
  }

  const marginPercent = 50 - percentValue
  return ` + ${(marginPercent / 100) * thumbHeight}`
}

const rangeInputHandler =
  ({
    setRangeValue,
    onChange,
  }: {
    setRangeValue: Dispatch<SetStateAction<number>>
    onChange: Dispatch<SetStateAction<number>>
  }): React.ChangeEventHandler<HTMLInputElement> =>
  (e) => {
    const val = Number.parseInt(e.target.value)
    setRangeValue(val)
    onChange(val)
  }

const preventScroll = (e: WheelEvent): void => {
  e.preventDefault()
}
const getDecimalCount = (num: number) => num.toString().split('.')[1].length

function rangeWheelHandler({
  min,
  max,
  step,
  rangeValue,
  setRangeValue,
  onChange,
}: RangeWheelHandler): React.WheelEventHandler<HTMLInputElement> {
  return (e) => {
    e.preventDefault()

    let value = e.deltaY < 0 ? rangeValue + step : rangeValue - step

    value = Number.parseFloat(value.toFixed(getDecimalCount(step)))
    console.log({ value, step, rangeValue })
    if (value > max || value < min) return

    setRangeValue(value)
    onChange(value)
  }
}

function Range({
  min = 0,
  max = 100,
  step = 1,
  name = 'input_range',
  value = max / 2 + min,
  suffix = '',
  onChange = () => {
    console.log('updated select input')
  },
}: RangeProps) {
  const [rangeValue, setRangeValue] = useState(value)

  const mult = 100 / (max - min)
  const percentValue = mult * (rangeValue - min)

  const rangeStyle = {
    background: `linear-gradient(to right, ${primaryColor}, ${primaryColor} ${percentValue}%, ${accentColor} ${percentValue}%, ${accentColor})`,
  }

  const progressStyle = {
    left: `calc(${percentValue}% ${getProgressOffset(percentValue, Number.parseInt(rangeThumbHeight))}rem)`,
  }

  return (
    <>
      <div
        className="container--range"
        onMouseOver={() => {
          window.addEventListener('wheel', preventScroll, { passive: false })
        }}
        onMouseLeave={() => {
          window.removeEventListener('wheel', preventScroll)
        }}
      >
        <input
          type="range"
          style={rangeStyle}
          min={min}
          max={max}
          step={step}
          name={name}
          value={rangeValue}
          className="container--range__input--range"
          onChange={rangeInputHandler({
            setRangeValue,
            onChange,
          })}
          onWheel={rangeWheelHandler({
            rangeValue,
            min,
            max,
            step,
            setRangeValue,
            onChange,
          })}
        />
        <span className="container--range__progress" style={progressStyle}>
          {`${rangeValue} ${suffix}`}
        </span>
      </div>
    </>
  )
}

export { Range }
