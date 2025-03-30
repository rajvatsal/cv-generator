import { useState } from 'react'
import './Range.scss'

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

function getCssVars(element, variable) {
  return getComputedStyle(element).getPropertyValue(variable)
}

function getProgressOffset(percentValue, thumbHeight) {
  const isOver = percentValue > 50
  if (isOver) {
    const marginPercent = percentValue - 50
    return ` - ${(marginPercent / 100) * thumbHeight}`
  }

  const marginPercent = 50 - percentValue
  return ` + ${(marginPercent / 100) * thumbHeight}`
}

function rangeInputHandler({ setRangeValue, onChange }) {
  return (e) => {
    setRangeValue(Number.parseFloat(e.target.value))
    onChange(e.target.value)
  }
}

const preventScroll = (e) => e.preventDefault()

function rangeContainerMouseOverHandler() {
  return () =>
    window.addEventListener('wheel', preventScroll, {
      passive: false,
    })
}

function rangeContainerMouseLeaveHandler() {
  return () =>
    window.removeEventListener('wheel', preventScroll, {
      passive: false,
    })
}

function getDecimalCount(num) {
  return num.toString().split('.')[1].length
}

function rangeWheelHandler({
  min,
  max,
  rangeValue,
  step,
  setRangeValue,
  onChange,
}) {
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

export function Range({
  min = 0,
  max = 100,
  step = 1,
  name = 'input_range',
  value = max / 2 + min,
  suffix = '',
  onChange = () => {
    console.log('changed')
  },
}) {
  const [rangeValue, setRangeValue] = useState(value)

  const mult = 100 / (max - min)
  const percentValue = mult * (rangeValue - min)

  const rangeStyle = {
    background: `linear-gradient(to right, ${primaryColor}, ${primaryColor} ${percentValue}%, ${accentColor} ${percentValue}%, ${accentColor})`,
  }

  const progressStyle = {
    left: `calc(${percentValue}% ${getProgressOffset(percentValue, rangeThumbHeight)}rem)`,
  }

  return (
    <>
      <div
        className="container--range"
        onFocus={() => console.log('hi')}
        onMouseOver={rangeContainerMouseOverHandler()}
        onMouseLeave={rangeContainerMouseLeaveHandler()}
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
            percentValue,
            setRangeValue,
            rangeValue,
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
