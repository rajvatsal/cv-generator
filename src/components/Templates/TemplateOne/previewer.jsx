import './template.scss'

export function Previewer({ details }) {
  return (
    <div>
      <section className="previewer__section--intro">
        <h2 className="previewer__name case-up">{details.name}</h2>
        <span className="previewer__address case-up">{details.address}</span>
        <span className="previewer__phone-number case-up">
          {details.phoneNumber}
        </span>
        <span className="previewer__email case-up">{details.email}</span>
      </section>
      <section className="previewer__section--career-objectives">
        <h2>Career Objectives</h2>
        <ul>
          {details.careerObjectives.map(({ id, data, isVisible }) => {
            if (isVisible === false) return null
            return (
              <li key={id}>
                <p>{data}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
