import { useState } from 'react'
import './Select.scss'

const versions = {
  v1: ({ options }) => {
    const [selectedItem, setSelectedItem] = useState(-1)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const updateDropdownState = () => setIsDropdownOpen(!isDropdownOpen)
    const updateSelectedItem = (index) =>
      setSelectedItem(Number.parseInt(index))

    const buttonTextContent =
      selectedItem === -1 ? 'Orientation' : options[selectedItem]

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
            {buttonTextContent}
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
            arialabelledby="dropdown-button"
          >
            {options.map((opt, i) => {
              const listItem =
                i === selectedItem ? (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
                  // biome-ignore lint/a11y/useSemanticElements: <explanation>
                  // biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
                  <li className="selected" role="option">
                    {opt}
                  </li>
                ) : (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  // biome-ignore lint/a11y/useSemanticElements: <explanation>
                  // biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
                  // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
                  <li role="option">{opt}</li>
                )
              return (
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
              )
            })}
            {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
            {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
            {/* biome-ignore lint/a11y/useAriaPropsForRole: <explanation> */}
            {/* biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation> */}
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
  },

  v2: ({ options, onChange, selected }) => {
    const [selectedItem, setSelectedItem] = useState(selected)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const updateDropdownState = () => setIsDropdownOpen(!isDropdownOpen)
    const updateSelectedItem = (index) => {
      setSelectedItem(Number.parseInt(index))
      onChange(options[Number.parseInt(index)])
    }

    const buttonTextContent = options[selectedItem]

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
            {buttonTextContent}
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
            arialabelledby="dropdown-button"
          >
            {options.map((opt, i) => {
              const listItem =
                i === selectedItem ? (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
                  // biome-ignore lint/a11y/useSemanticElements: <explanation>
                  // biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
                  <li className="selected" role="option">
                    {opt}
                  </li>
                ) : (
                  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                  // biome-ignore lint/a11y/useSemanticElements: <explanation>
                  // biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
                  // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
                  <li role="option">{opt}</li>
                )
              return (
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
              )
            })}
          </ul>
        )}
      </div>
    )
  },
}

export function Select(props) {
  const Select = versions[props.version]

  if (Select === undefined) return null

  return <Select {...props} />
}
