import { isAfter, format } from 'date-fns'
import './template.scss'

export function Previewer({ details }) {
  let phoneNumber = details.phoneNumber.split(' ')
  // console.log(phoneNumber)
  phoneNumber = `(${phoneNumber[0]}) ${phoneNumber[1]}`
  return (
    <div className="previewer">
      <section className="previewer__section--intro">
        <h2 className="previewer__section--intro__name case-up">
          {details.name}
        </h2>
        <div className="previewer__section--intro__personal-info">
          <span className="previewer__section--intro__address case-up">
            {details.address}
          </span>
          <span className="previewer__section--intro__phone-number case-up">
            {phoneNumber}
          </span>
          <span className="previewer__section--intro__email case-up">
            {details.email}
          </span>
        </div>
      </section>
      <section className="previewer__section--career-objectives">
        <h3 className="previewer__section--career-objectives__heading">
          Career Objectives
        </h3>
        <ul className="previewer__section--career-objectives__data list--no-style">
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
        <h3 className="previewer__section--core-qualifications__heading list--no-style">
          Core Qualifications
        </h3>
        <ul className="previewer__section--core-qualifications__data list--no-style">
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
        <h3 className=">previewer__section--education__heading">Education</h3>
        <ul className=">previewer__section--education__data list--no-style">
          {details.education.map((ed) => {
            if (ed.isVisible === false) return null
            return (
              <li key={ed.id}>
                <p className="main__preview__education__date">
                  {isAfter(new Date(), ed.date)
                    ? 'COMPLETED IN '
                    : 'EXPECTED IN '}
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
      <section className="previewer__section--work-experience">
        <h3 className="previewer__section--work-experience__heading">
          Work Experience
        </h3>
        <ul className="previewer__section--work-experience__data list--no-style">
          {details.workExperience.map((we) => {
            if (we.isVisible === false) return null
            return (
              <li key={we.id}>
                <p className="previewer__work-experience__date">
                  <span className="previewer__work-experience__date--start">
                    {`${format(we.startDate, 'MMMM y').toUpperCase()}-`}
                  </span>
                  <span className="previewer__work-experience__date--end">
                    {!isAfter(new Date(), we.endDate)
                      ? 'CURRENT'
                      : format(we.endDate, 'MMMM y').toUpperCase()}
                  </span>
                </p>
                <div>
                  <b>{we.jobTitle}</b>|<span>{we.workPlace}</span>|
                  <span>{we.location}</span>
                </div>
                <ul>
                  {we.responsibilities.map((resp) => {
                    if (resp.isVisible === false) return null
                    return (
                      <li key={resp.id}>
                        <p>{resp.data}</p>
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
