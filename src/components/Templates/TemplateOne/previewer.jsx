import './template.scss'

export function Previewer({ details }) {
  return (
    <div>
      <h2 className="previewer__name case-up">{details.name}</h2>
      <span className="previewer__address case-up">{details.address}</span>
      <span className="previewer__phone-number case-up">
        {details.phoneNumber}
      </span>
      <span className="previewer__email case-up">{details.email}</span>
    </div>
  )
}
