import './Input.scss'

interface Textarea_P {
  label: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  required?: boolean
  help?: string
  extras?: object
}

interface Input_P {
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: string
  pattern?: string
  required?: boolean
  help?: string
  name?: string
  extras?: object
}

function Textarea({
  label = 'Enter something',
  name = 'nm',
  onChange = () => console.log('changed'),
  placeholder = 'Placeholder',
  required = false,
  help = 'try being sensible in your inputs',
  extras = {},
}: Textarea_P) {
  return (
    <div className="input-container">
      <textarea
        className="input-container__input"
        id={`usr_${name}`}
        name={`usr_${name}`}
        placeholder={placeholder}
        onChange={onChange}
        {...extras}
        required={required}
      />
      <label
        className="input-container__label"
        htmlFor={`usr_${name}`}
        data-help={`(${help})`}
      >
        {label}
      </label>
    </div>
  )
}

function Input({
  label = 'Enter something',
  name = 'nm',
  pattern = '.*',
  onChange = () => console.log('changed'),
  placeholder = 'Placeholder',
  type = 'text',
  required = false,
  help = 'try being sensible in your inputs',
  extras = {},
}: Input_P) {
  return (
    <div className="input-container">
      <input
        className="input-container__input"
        type={type}
        id={`usr_${name}`}
        name={`usr_${name}`}
        pattern={pattern}
        placeholder={placeholder}
        onChange={onChange}
        {...extras}
        required={required}
      />
      <label
        className="input-container__label"
        htmlFor={`usr_${name}`}
        data-help={`(${help})`}
      >
        {label}
      </label>
    </div>
  )
}

export { Textarea, Input }
