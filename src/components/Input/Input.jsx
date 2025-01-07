export function Textarea({
  label = 'Enter something',
  name = 'nm',
  onChange = () => console.log('changed'),
  placeholder = 'Placeholder',
  required = false,
  help = 'try being sensible in your inputs',
  extras = {},
}) {
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

export function Input({
  label = 'Enter something',
  name = 'nm',
  pattern = '.*',
  onChange = () => console.log('changed'),
  placeholder = 'Placeholder',
  type = 'text',
  required = false,
  help = 'try being sensible in your inputs',
  extras = {},
}) {
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
