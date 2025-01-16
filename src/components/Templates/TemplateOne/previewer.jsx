import { isAfter, format } from 'date-fns'
import './template.scss'

export function Previewer({ details, previewClassName }) {
  let phoneNumber = details.phoneNumber.split(' ')
  // console.log(phoneNumber)
  phoneNumber = `(${phoneNumber[0]}) ${phoneNumber[1]}`
  return (
    <div className={`previewer custom-scrollbar ${previewClassName}`}>
      <section className="previewer__section--intro previewer__section">
        <h2 className="previewer__section--intro__name case-up ">
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
      <section className="previewer__section--career-objectives previewer__section">
        <h3 className="previewer__section--career-objectives__heading previewer__heading">
          Career Objectives
        </h3>
        <ul className="previewer__section--career-objectives__data list--no-style previewer__data">
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
      <section className="previewer__section--core-qualifications previewer__section">
        <h3 className="previewer__section--core-qualifications__heading list--no-style previewer__heading">
          Core Qualifications
        </h3>
        <ul className="previewer__section--core-qualifications__data previewer__data">
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

      <section className="previewer__section--education previewer__section">
        <h3 className=">previewer__section--education__heading previewer__heading">
          Education
        </h3>
        <ul className=">previewer__section--education__data list--no-style previewer__data">
          {details.education.map((ed) => {
            if (ed.isVisible === false) return null
            return (
              <li key={ed.id}>
                <p className="previewer__date case-up">
                  {isAfter(ed.date, new Date())
                    ? `expected in ${format(ed.date, 'MMMM y')}`
                    : `completed in ${format(ed.date, 'MMMM y')}`}
                </p>
                <p>
                  <span className="previewer__bold">{ed.degree}:</span>
                  <span> {ed.subject}</span>
                </p>
                <p>
                  <span>{ed.address}</span>
                </p>
                <p>
                  <span className="previewer__bold">GPA: {ed.gpa}</span>
                </p>
                <ul className="list--no-style">
                  {ed.extras.map((ext) => {
                    if (ext.isVisible === false) return null
                    return (
                      <li key={ext.id}>
                        <span className="previewer__bold">{ext.bold}</span>
                        {ext.light === '' ? null : <span>: {ext.light}</span>}
                      </li>
                    )
                  })}
                </ul>

                <span className="previewer__bold">Relevant CourseWork</span>
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
      <section className="previewer__section--work-experience previewer__section">
        <h3 className="previewer__section--work-experience__heading previewer__heading">
          Work Experience
        </h3>
        <ul className="previewer__section--work-experience__data list--no-style previewer__data">
          {details.workExperience.map((we) => {
            if (we.isVisible === false) return null
            return (
              <li key={we.id}>
                <p className="previewer__section--work-experience__date previewer__date">
                  <span className="previewer__section--work-experience__date--start">
                    {`${format(we.startDate, 'MMMM y').toUpperCase()}-`}
                  </span>
                  <span className="previewer__work-experience__date--end">
                    {!isAfter(new Date(), we.endDate)
                      ? 'CURRENT'
                      : format(we.endDate, 'MMMM y').toUpperCase()}
                  </span>
                </p>
                <div className="previewer__section--work-experience__sub-heading">
                  <span className="previewer__bold">{we.jobTitle}</span>|
                  <span>{we.workPlace}</span>|<span>{we.location}</span>
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
