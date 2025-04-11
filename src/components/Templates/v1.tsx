import './v1.scss'
import { isAfter, format } from 'date-fns'
// TODO: Assign a better to default values, default data and defaultValues.ts
import { defaultValues, UserData } from './defaultData.ts'
import { Input, Textarea } from '../generals/Input.tsx'
import PersonalDetails from '../PersonalDetails.tsx'
import ControlSection from '../ControlSection.tsx'

// TODO:
// Combine controls to a single component
// Use children prop instead of passing inputs as props

interface Previewer {
  details: UserData
  previewClassName: string
}

interface Controls {
  details: UserData
  updateDetails: (data: Partial<UserData>) => void
}

function Previewer({ details, previewClassName }: Previewer) {
  let phoneNumber: string | string[] = details.phoneNumber.split(' ')
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
                  {ed.extras.map((extra) => {
                    if (!extra.isVisible) return null
                    return (
                      <li key={extra.id}>
                        <span className="previewer__bold">{extra.bold}</span>
                        {extra.light === '' ? null : (
                          <span>: {extra.light}</span>
                        )}
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
                  {we.responsibilities.map((responsibility) => {
                    if (!responsibility.isVisible) return null
                    return (
                      <li key={responsibility.id}>
                        <p>{responsibility.data}</p>
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

function CareerObjectives({ details, updateDetails }: Controls) {
  const listItems = details.careerObjectives
  const bemClassName = 'career-objective'
  const stateName = 'careerObjectives'
  const headingName = 'Career Objective'
  const updateFn = updateDetails
  const getLabelText = (data: object): string => data.data

  return (
    <ControlSection
      {...{
        listItems,
        bemClassName,
        stateName,
        headingName,
        updateFn,
        getLabelText,
        defaultValues,
      }}
    >
      {(id: number | null): JSX.Element => (
        <>
          <h4 className="main__controls__control-heading">Goal #</h4>
          <Textarea
            name={bemClassName}
            label="Goal"
            placeholder="Describe your career goal"
            extras={{ rows: '5', cols: '33' }}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const updatedData = {
                [stateName]: listItems.map((data) => {
                  if (id !== data.id) return data
                  return Object.assign({}, data, { data: e.target.value })
                }),
              }
              updateFn(updatedData)
            }}
          />
        </>
      )}
    </ControlSection>
  )
}

function CoreQualifications({ details, updateDetails }: Controls) {
  const listItems = details.coreQualifications
  const bemClassName = 'core-qualifications'
  const stateName = 'coreQualifications'
  const headingName = 'Core Qualification'
  const updateFn = updateDetails
  const getLabelText = (data) => data.data

  return (
    <ControlSection
      {...{
        listItems,
        bemClassName,
        stateName,
        headingName,
        updateFn,
        getLabelText,
        defaultValues,
      }}
    >
      {(id: number | null) => (
        <div className="input-fields-container">
          <h4 className="main__controls__control-heading">Qualification #</h4>
          <Input
            type="text"
            placeholder="Quailification"
            label="Quailification"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedData = listItems.map((data) =>
                data.id !== id
                  ? data
                  : Object.assign({}, data, { data: e.target.value })
              )

              updateFn({ [stateName]: updatedData })
            }}
          />
        </div>
      )}
    </ControlSection>
  )
}

function Education({ updateDetails, details }: Controls) {
  const listItems = details.education
  const bemClassName = 'education'
  const stateName = 'education'
  const headingName = 'Education'
  const updateFn = updateDetails
  const getLabelText = (data) => data.degree

  function addFn() {
    const updatedData = listItems.slice()
    const defaults = defaultValues[stateName]
    const extras = [defaults.extras]
    const relevantCourseWork = [defaults.relevantCourseWork]
    updatedData.push(
      Object.assign(
        {},
        defaults,
        {
          id:
            listItems.length === 0 ? 1 : listItems[listItems.length - 1].id + 1,
        },
        { extras, relevantCourseWork }
      )
    )

    updateFn({ education: updatedData })
  }

  return (
    <ControlSection
      {...{
        listItems,
        bemClassName,
        stateName,
        headingName,
        updateFn,
        getLabelText,
        addFn,
        defaultValues,
      }}
    >
      {(id: number | null): JSX.Element => {
        const activeEducation = listItems.find((item) => item.id === id)

        const edUpdateFn = (updatedEd) =>
          updateFn({
            [stateName]: listItems.map((ed) =>
              ed.id === id ? Object.assign({}, ed, updatedEd) : ed
            ),
          })

        const extras = activeEducation ? activeEducation.extras : null
        const relevantCourseWork = activeEducation
          ? activeEducation.relevantCourseWork
          : null

        function changeFn(e) {
          const updatedData = listItems.map((ed) => {
            if (ed.id !== activeEducation.id) return ed
            return Object.assign({}, ed, {
              [this.state]: this.getValue ? this.getValue(e) : e.target.value,
            })
          })

          updateFn({ [stateName]: updatedData })
        }

        return (
          <div className="input-fields-container">
            <div className="input-fields-container__section--date input-fields-container__section">
              <h4 className="main__controls__control-heading">Date #</h4>
              <input
                type="date"
                name="degree start or end date"
                className="input--date"
                onChange={changeFn.bind({ state: 'date' })}
              />
            </div>
            <h4 className="main__controls__control-heading">About #</h4>
            <Input
              type="text"
              placeholder="Degree"
              label="Degree"
              name="degree"
              onChange={changeFn.bind({ state: 'degree' })}
            />
            <Input
              type="text"
              placeholder="Subject"
              label="Subject"
              name="subject"
              onChange={changeFn.bind({ state: 'subject' })}
            />
            <Input
              type="text"
              placeholder="Address"
              label="Address"
              name="address"
              onChange={changeFn.bind({ state: 'address' })}
            />
            <Input
              type="number"
              placeholder="GPA"
              label="GPA"
              name="GPA"
              extras={{
                step: 0.1,
                max: 10,
                min: 1,
              }}
              onChange={changeFn.bind({ state: 'gpa' })}
            />

            {extras && (
              <ControlSection
                listItems={extras}
                stateName="extras"
                headingName="Extras"
                bemClassName="extras"
                updateFn={edUpdateFn}
                getLabelText={(data) => data.bold}
                sectionType="section--nested"
                defaultValues={defaultValues.education}
              >
                {(id: number | null): JSX.Element => (
                  <div className="input-fields-container">
                    <Input
                      type="text"
                      placeholder="Bold Text"
                      label="bold"
                      name="extras_bold"
                      onChange={(e) => {
                        const newExtras = extras.map((ext) =>
                          ext.id !== id
                            ? ext
                            : Object.assign({}, ext, { bold: e.target.value })
                        )
                        edUpdateFn(Object.assign({}, { ['extras']: newExtras }))
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Light Text"
                      label="light"
                      name="extras_light"
                      onChange={(e) => {
                        const newExtras = extras.map((ext) =>
                          ext.id !== id
                            ? ext
                            : Object.assign({}, ext, { light: e.target.value })
                        )
                        edUpdateFn(Object.assign({}, { ['extras']: newExtras }))
                      }}
                    />
                  </div>
                )}
              </ControlSection>
            )}

            {relevantCourseWork && (
              <ControlSection
                listItems={relevantCourseWork}
                stateName="relevantCourseWork"
                headingName="Relevant Course Work"
                bemClassName="relevant-course-work"
                updateFn={edUpdateFn}
                getLabelText={(data) => data.data}
                sectionType="section--nested"
                defaultValues={defaultValues.education}
              >
                {(id: number | null): JSX.Element => (
                  <Input
                    type="text"
                    placeholder="Relevant Coursework"
                    label="Relevant Coursework"
                    name="relevantCourseWork"
                    onChange={(e) => {
                      const rcw = relevantCourseWork.map((ext) =>
                        ext.id !== id
                          ? ext
                          : Object.assign({}, ext, { data: e.target.value })
                      )
                      edUpdateFn(
                        Object.assign({}, { ['relevantCourseWork']: rcw })
                      )
                    }}
                  />
                )}
              </ControlSection>
            )}
          </div>
        )
      }}
    </ControlSection>
  )
}

function WorkExperience({ updateDetails, details }: Controls) {
  const listItems = details.workExperience
  const bemClassName = 'work-experience'
  const stateName = 'workExperience'
  const headingName = 'Work Experience'
  const getLabelText = (data) => data.jobTitle
  const updateFn = updateDetails

  function addFn() {
    const { listItems, stateName, updateFn, defaultValues } = this

    const updatedData = listItems.slice()
    const defaults = defaultValues[stateName]
    const responsibilities = [defaults.responsibilities]
    updatedData.push(
      Object.assign(
        {},
        defaults,
        {
          id:
            listItems.length === 0 ? 1 : listItems[listItems.length - 1].id + 1,
        },
        { responsibilities }
      )
    )

    updateFn({ workExperience: updatedData })
  }

  return (
    <ControlSection
      {...{
        listItems,
        addFn,
        bemClassName,
        stateName,
        headingName,
        getLabelText,
        updateFn,
        defaultValues,
      }}
    >
      {(id) => {
        const activeWorkExperience = id
          ? listItems.find((item) => item.id === id)
          : null

        const responsibilities = activeWorkExperience
          ? activeWorkExperience.responsibilities
          : null

        const weUpdateFn = (updatedData) =>
          updateFn({
            [stateName]: listItems.map((item) => {
              if (item.id !== id) return item
              return Object.assign({}, item, updatedData)
            }),
          })

        function changeFn(e: React.ChangeEvent<HTMLInputElement>) {
          updateFn({
            [stateName]: listItems.map((item) => {
              return item.id !== activeWorkExperience.id
                ? item
                : Object.assign({}, item, { [this.state]: e.target.value })
            }),
          })
        }

        return (
          <div className="input-fields-container">
            <div className="container-input--date">
              <h4 className="main__controls__control-heading">Date #</h4>
              <input
                type="date"
                name="start_date"
                className="input--date"
                onChange={changeFn.bind({ state: 'startDate' })}
              />
              <span>--</span>
              <input
                type="date"
                name="start_date"
                className="input--date"
                onChange={changeFn.bind({ state: 'endDate' })}
              />
            </div>
            <h4 className="main__controls__control-heading">About #</h4>
            <Input
              type="text"
              placeholder="Job Title"
              label="Job Title"
              name="job_title"
              onChange={changeFn.bind({ state: 'jobTitle' })}
            />
            <Input
              type="text"
              placeholder="Work Place"
              label="Work Place"
              name="work_place"
              onChange={changeFn.bind({ state: 'workPlace' })}
            />
            <Input
              type="text"
              placeholder="Location"
              label="Location"
              name="location"
              onChange={changeFn.bind({ state: 'location' })}
            />
            {responsibilities && (
              <ControlSection
                stateName="responsibilities"
                listItems={responsibilities}
                headingName="Work Experience"
                bemClassName="work-experience"
                getLabelText={(data) => data.data}
                sectionType="section--nested"
                defaultValues={defaultValues.workExperience}
                updateFn={weUpdateFn}
              >
                {(id: number | null) => {
                  return (
                    <Textarea
                      placeholder="Explain your responsibilities there"
                      name="responsibility"
                      label="Responsibility"
                      extras={{
                        rows: 5,
                        cols: 33,
                      }}
                      onChange={(e) => {
                        const updatedData = {
                          ['responsibilities']: responsibilities.map((item) =>
                            item.id === id
                              ? Object.assign({}, item, {
                                  data: e.target.value,
                                })
                              : item
                          ),
                        }
                        weUpdateFn(updatedData)
                      }}
                    />
                  )
                }}
              </ControlSection>
            )}
          </div>
        )
      }}
    </ControlSection>
  )
}

function Controls({ details, updateDetails }: Controls) {
  return (
    <div className="main__controls">
      <PersonalDetails updateDetails={updateDetails} />
      <CareerObjectives {...{ details, updateDetails }} />
      <CoreQualifications {...{ details, updateDetails }} />
      <Education {...{ details, updateDetails }} />
      <WorkExperience {...{ details, updateDetails }} />
    </div>
  )
}

export default { Previewer, Controls }
