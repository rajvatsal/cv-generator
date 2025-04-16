import { useState } from 'react'
import './Select.scss'

interface Select_P {
  options: string[]
  selected: number
  version: string
  onChange: (selectOption: string) => void
}

function V1({ options }: { options: string[] }) {
  const [selectedItem, setSelectedItem] = useState(-1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const updateDropdownState = () => setIsDropdownOpen(!isDropdownOpen)
  const updateSelectedItem = (index: number) => setSelectedItem(index)

  return (
    <div className="input--select">
      <button
        type="button"
        id="dropdown-button"
        className="input--select__select-button"
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-controls="select-dropdown"
        onClick={updateDropdownState}
      >
        <span className="input--select__select-button__selected-value">
          {options[selectedItem]}
        </span>
        <span className="input--select__select-button__arrow" />
      </button>
      {isDropdownOpen === false ? null : (
        // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
        <ul
          id="select-drodown"
          className="input--select__select-dropdown custom-scrollbar"
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="listbox"
          aria-labelledby="dropdown-button"
        >
          {options.map((opt: string, i: number) => (
            <li
              className={`${i === selectedItem ? 'selected' : ''}`}
              role="option"
              onClick={() => {
                updateDropdownState()
                updateSelectedItem(i)
              }}
            >
              {opt}
            </li>
          ))}
          <li
            role="option"
            data-value="clear"
            onClick={() => {
              updateSelectedItem(-1)
              updateDropdownState()
            }}
          >
            <span>Clear Selection</span>
          </li>
        </ul>
      )}
    </div>
  )
}

function V2({ options, onChange, selected }: Select_P) {
  const [selectedItem, setSelectedItem] = useState<number>(selected)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const updateDropdownState = () => setIsDropdownOpen(!isDropdownOpen)
  const updateSelectedItem = (index: number) => {
    setSelectedItem(index)
    onChange(options[index])
  }

  return (
    <div className="input--select">
      <button
        type="button"
        id="dropdown-button"
        className="input--select__select-button"
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-controls="select-dropdown"
        onClick={updateDropdownState}
      >
        <span className="input--select__select-button__selected-value">
          {options[selected]}
        </span>
        <span className="input--select__select-button__arrow" />
      </button>
      {isDropdownOpen === false ? null : (
        <ul
          id="select-drodown"
          className="input--select__select-dropdown custom-scrollbar"
          role="listbox"
          aria-labelledby="dropdown-button"
        >
          {options.map((opt: string, i: number) => (
            <li
              className={`${i === selectedItem ? 'selected' : ''}`}
              role="option"
              onClick={() => {
                updateDropdownState()
                updateSelectedItem(i)
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Select(props: Select_P) {
  let Jsx
  switch (props.version) {
    case 'v1':
      Jsx = <V1 {...props} />
      break
    case 'v2':
      Jsx = <V2 {...props} />
      break
    default:
      Jsx = null
  }

  return Jsx
}

export { Select }
