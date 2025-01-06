import { isAfter, format } from 'date-fns'
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
      <section className="previewer__section--core-qualifications">
        <h2>Core Qualifications</h2>
        <ul>
          {details.coreQualifications.map(({ id, data, isVisible }) => {
            if (isVisible === false) return null
            return (
              <li key={id}>
                <p>{data}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="previewer__section--education">
        <h2>Education</h2>
        <ul>
          {details.education.map((ed) => {
            if (ed.isVisible === false) return null
            return (
              <li key={ed.id}>
                <p className="main__preview__education__date">
                  {isAfter(new Date(), ed.date)
                    ? 'COMPLETED IN'
                    : 'EXPECTED IN'}{' '}
                  {format(ed.date, 'MMMM y').toUpperCase()}
                </p>

                <p>
                  <b>{ed.degree}:</b>
                  <span> {ed.subject}</span>
                </p>
                <p>
                  <span>{ed.address}</span>
                </p>
                <p>
                  <b>GPA: {ed.gpa}</b>
                </p>
                <ul>
                  {ed.extras.map((ext) => {
                    if (ext.isVisible === false) return null
                    return (
                      <li key={ext.id}>
                        <b>{ext.bold}</b>
                        {ext.light === '' ? null : <span>: {ext.light}</span>}
                      </li>
                    )
                  })}
                </ul>

                <b>Relevant CourseWork</b>
                <ul>
                  {ed.relevantCourseWork.map((rc) => {
                    if (rc.isVisible === false) return null
                    return (
                      <li key={rc.id}>
                        <p>{rc.data}</p>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
