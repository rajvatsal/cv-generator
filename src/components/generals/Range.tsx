import { Dispatch, SetStateAction, useState } from 'react'
import './Range.scss'

interface RangeProps {
  min: number
  max: number
  step: number
  value: number
  name: string
  suffix: string
  onChange: Dispatch<SetStateAction<number>>
}

const getCssVars = (element: HTMLElement, variable: string): string =>
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

function getProgressOffset(percentValue: number, thumbHeight: number): string {
  const isOver = percentValue > 50
  if (isOver) {
    const marginPercent = percentValue - 50
    return ` - ${(marginPercent / 100) * thumbHeight}`
  }

  const marginPercent = 50 - percentValue
  return ` + ${(marginPercent / 100) * thumbHeight}`
}

function onWheelHandlerPreventScroll(e: WheelEvent): void {
  e.preventDefault()
}

const getDecimalCount = (num: number): number =>
  num.toString().split('.')[1].length

function Range({
  min = 0,
  max = 100,
  step = 1,
  name = 'input_range',
  value = max / 2 + min,
  suffix = '',
  onChange = () => {
    console.log(`updated ${name}`)
  },
}: RangeProps) {
  const [rangeValue, setRangeValue] = useState<number>(value)
  const percentValue = ((rangeValue - min) / (max - min)) * 100

  return (
    <>
      <div
        className="container--range"
        onMouseOver={() => {
          window.addEventListener('wheel', onWheelHandlerPreventScroll, {
            passive: false,
          })
        }}
        onMouseLeave={() => {
          window.removeEventListener('wheel', onWheelHandlerPreventScroll)
        }}
      >
        <input
          type="range"
          style={{
            background: `linear-gradient(to right, ${primaryColor}, ${primaryColor} ${percentValue}%, ${accentColor} ${percentValue}%, ${accentColor})`,
          }}
          min={min}
          max={max}
          step={step}
          name={name}
          value={rangeValue}
          className="container--range__input--range"
          onChange={(e) => {
            const val = Number.parseInt(e.target.value)
            setRangeValue(val)
            onChange(val)
          }}
          onWheel={(e) => {
            e.preventDefault()

            let value = e.deltaY < 0 ? rangeValue + step : rangeValue - step

            value = Number.parseFloat(value.toFixed(getDecimalCount(step)))
            if (value > max || value < min) return

            setRangeValue(value)
            onChange(value)
          }}
        />
        <span
          className="container--range__progress"
          style={{
            left: `calc(${percentValue}% ${getProgressOffset(percentValue, Number.parseInt(rangeThumbHeight))}rem)`,
          }}
        >
          {`${rangeValue} ${suffix}`}
        </span>
      </div>
    </>
  )
}

export { Range }
