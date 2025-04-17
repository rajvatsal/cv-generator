import './v1.scss'
import { isAfter, format } from 'date-fns'
// TODO: Assign a better to default values, default data and defaultValues.ts
import {
  defaultValues,
  UserData,
  CareerObjectives_I,
  CoreQualifications_I,
  Education_I,
  EducationMock_I,
  WorkExperience_I,
  Extras_I,
  RelevantCourseWork_I,
  Responsibilities_I,
} from './defaultData.ts'
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

function defaultAddFn<T extends { id: number }>(
  listItems: T[],
  stateName: string,
  updateFn: (data: { [key: string]: T[] }) => void,
  defaults: T
): React.MouseEventHandler<HTMLButtonElement> {
  return () => {
    const updatedData = listItems.slice()
    const newData =
      listItems.length === 0
        ? defaults
        : Object.assign({}, defaults, {
          id: listItems[listItems.length - 1].id + 1,
        })

    updatedData.push(Object.assign({}, newData))
    updateFn({ [stateName]: updatedData })
  }
}

// TODO: Give better names to functions like updateFn should be updateDetails/updateEducation
function CareerObjectives({ details, updateDetails }: Controls) {
  const objectives = details.careerObjectives
  const stateName = 'careerObjectives'
  const updateObjectives = updateDetails
  const bemClassName = 'career-objective'

  return (
    <ControlSection<CareerObjectives_I>
      {...{
        listItems: objectives,
        headingName: 'Career Objective',
        getLabelText: (data: CareerObjectives_I): string => data.data,
        stateName,
        bemClassName,
        updateFn: updateObjectives,
        addFn: defaultAddFn<CareerObjectives_I>(
          objectives,
          stateName,
          updateObjectives,
          defaultValues.careerObjectives
        ),
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
                [stateName]: objectives.map((data) => {
                  if (id !== data.id) return data
                  return Object.assign({}, data, { data: e.target.value })
                }),
              }
              updateObjectives(updatedData)
            }}
          />
        </>
      )}
    </ControlSection>
  )
}

function CoreQualifications({ details, updateDetails }: Controls) {
  const qualifications = details.coreQualifications
  const stateName = 'coreQualifications'
  const updateQalifications = updateDetails

  return (
    <ControlSection<CoreQualifications_I>
      {...{
        listItems: qualifications,
        bemClassName: 'core-qualifications',
        headingName: 'Core Qualification',
        getLabelText: (data: CoreQualifications_I): string => data.data,
        stateName,
        updateFn: updateQalifications,
        addFn: defaultAddFn<CoreQualifications_I>(
          qualifications,
          stateName,
          updateQalifications,
          defaultValues.coreQualifications
        ),
      }}
    >
      {(selectedQualification: number | null) => (
        <div className="input-fields-container">
          <h4 className="main__controls__control-heading">Qualification #</h4>
          <Input
            type="text"
            placeholder="Quailification"
            label="Quailification"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const updatedData = qualifications.map((data) =>
                data.id !== selectedQualification
                  ? data
                  : Object.assign({}, data, { data: e.target.value })
              )

              updateQalifications({ [stateName]: updatedData })
            }}
          />
        </div>
      )}
    </ControlSection>
  )
}

function Education(props: Controls) {
  const educations = props.details.education
  const stateName = 'education'
  const updateEducation = props.updateDetails
  const getLabelText = (data: Education_I): string => data.degree

  const addEducation = () => {
    const defaults: EducationMock_I = defaultValues[stateName]
    const extras: Extras_I[] = [defaults.extras]
    const relevantCourseWork: RelevantCourseWork_I[] = [
      defaults.relevantCourseWork,
    ]
    educations.push(
      Object.assign(
        {},
        defaults,
        {
          id:
            educations.length === 0
              ? 1
              : educations[educations.length - 1].id + 1,
        },
        { extras, relevantCourseWork }
      )
    )

    updateEducation({ education: educations })
  }

  return (
    <ControlSection<Education_I>
      {...{
        stateName,
        getLabelText,
        defaultValues,
        listItems: educations,
        bemClassName: 'education',
        headingName: 'Education',
        addFn: addEducation,
        updateFn: updateEducation,
      }}
    >
      {(id: number | null): JSX.Element => {
        const selectedEd = educations.find((item) => item.id === id)

        const updateEducationProperties = (
          updatedProperty: Partial<Education_I>
        ) => {
          updateEducation({
            [stateName]: educations.map((education) =>
              education.id === id
                ? Object.assign(education, updatedProperty)
                : education
            ),
          })
        }

        const extras = selectedEd ? selectedEd.extras : null
        const courseWorks = selectedEd ? selectedEd.relevantCourseWork : null

        const changeEducationProperty =
          (state: string): React.ChangeEventHandler<HTMLInputElement> =>
            (e) => {
              const updatedEducations = educations.map((ed: Education_I) => {
                return ed.id === id
                  ? Object.assign(ed, {
                    [state]: e.target.value,
                  })
                  : ed
              })

              updateEducation({ [stateName]: updatedEducations })
            }

        return (
          <div className="input-fields-container">
            <div className="input-fields-container__section--date input-fields-container__section">
              <h4 className="main__controls__control-heading">Date #</h4>
              <input
                type="date"
                name="degree start or end date"
                className="input--date"
                onChange={changeEducationProperty('date')}
              />
            </div>
            <h4 className="main__controls__control-heading">About #</h4>
            <Input
              type="text"
              placeholder="Degree"
              label="Degree"
              name="degree"
              onChange={changeEducationProperty('degree')}
            />
            <Input
              type="text"
              placeholder="Subject"
              label="Subject"
              name="subject"
              onChange={changeEducationProperty('subject')}
            />
            <Input
              type="text"
              placeholder="Address"
              label="Address"
              name="address"
              onChange={changeEducationProperty('address')}
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
              onChange={changeEducationProperty('gpa')}
            />

            {extras && (
              <ControlSection<Extras_I>
                listItems={extras}
                stateName="extras"
                headingName="Extras"
                bemClassName="extras"
                sectionType="section--nested"
                updateFn={updateEducationProperties}
                getLabelText={(data: Extras_I): string => data.bold}
                addFn={defaultAddFn<Extras_I>(
                  extras,
                  'extras',
                  updateEducationProperties,
                  defaultValues.education.extras
                )}
              >
                {(selectedExtrasId: number | null): JSX.Element => (
                  <div className="input-fields-container">
                    <Input
                      type="text"
                      placeholder="Bold Text"
                      label="bold"
                      name="extras_bold"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newExtras = extras.map((extra) =>
                          extra.id === selectedExtrasId
                            ? Object.assign(extra, { bold: e.target.value })
                            : extra
                        )
                        updateEducationProperties({ extras: newExtras })
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Light Text"
                      label="light"
                      name="extras_light"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newExtras = extras.map((extra) =>
                          extra.id === selectedExtrasId
                            ? Object.assign(extra, { light: e.target.value })
                            : extra
                        )
                        updateEducationProperties({ extras: newExtras })
                      }}
                    />
                  </div>
                )}
              </ControlSection>
            )}

            {courseWorks && (
              <ControlSection<RelevantCourseWork_I>
                listItems={courseWorks}
                stateName="relevantCourseWork"
                headingName="Relevant Course Work"
                bemClassName="relevant-course-work"
                sectionType="section--nested"
                updateFn={updateEducationProperties}
                getLabelText={(data: RelevantCourseWork_I): string => data.data}
                addFn={defaultAddFn<RelevantCourseWork_I>(
                  courseWorks,
                  'relevantCourseWork',
                  updateEducationProperties,
                  defaultValues.education.relevantCourseWork
                )}
              >
                {(selectedCourseWorkId: number | null): JSX.Element => (
                  <Input
                    type="text"
                    placeholder="Relevant Coursework"
                    label="Relevant Coursework"
                    name="relevantCourseWork"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newCourseWorks = courseWorks.map((courseWork) =>
                        courseWork.id === selectedCourseWorkId
                          ? Object.assign(courseWork, {
                            data: e.target.value,
                          })
                          : courseWork
                      )
                      updateEducationProperties({
                        ['relevantCourseWork']: newCourseWorks,
                      })
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
  const workXps = details.workExperience
  const updateWorkXp = updateDetails
  const stateName = 'workExperience'

  const addWorkXp = () => {
    updateWorkXp({
      workExperience: [
        ...workXps.slice(),
        Object.assign(
          {},
          defaultValues[stateName],
          {
            id: workXps.length === 0 ? 1 : workXps[workXps.length - 1].id + 1,
          },
          { responsibilities: [defaultValues[stateName].responsibilities] }
        ),
      ],
    })
  }

  return (
    <ControlSection<WorkExperience_I>
      {...{
        listItems: workXps,
        bemClassName: 'work-experience',
        addFn: addWorkXp,
        headingName: 'Work Experience',
        getLabelText: (data: WorkExperience_I) => data.jobTitle,
        updateFn: updateWorkXp,
        stateName,
        defaultValues,
      }}
    >
      {(workXpId: number | null) => {
        const activeWorkExperience = workXpId
          ? workXps.find((item) => item.id === workXpId)
          : null

        const responsibilities = activeWorkExperience
          ? activeWorkExperience.responsibilities
          : null

        const updateWorkXpProperty = (
          updatedData: Partial<WorkExperience_I>
        ) => {
          updateWorkXp({
            [stateName]: workXps.map((item) => {
              if (item.id !== workXpId) return item
              return Object.assign(item, updatedData)
            }),
          })
        }

        const changeFn =
          (state: string): React.ChangeEventHandler<HTMLInputElement> =>
            (e) => {
              updateWorkXp({
                [stateName]: workXps.map((item) => {
                  return item.id !== workXpId
                    ? item
                    : Object.assign(item, { [state]: e.target.value })
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
                onChange={changeFn('startDate')}
              />
              <span>--</span>
              <input
                type="date"
                name="start_date"
                className="input--date"
                onChange={changeFn('endDate')}
              />
            </div>
            <h4 className="main__controls__control-heading">About #</h4>
            <Input
              type="text"
              placeholder="Job Title"
              label="Job Title"
              name="job_title"
              onChange={changeFn('jobTitle')}
            />
            <Input
              type="text"
              placeholder="Work Place"
              label="Work Place"
              name="work_place"
              onChange={changeFn('workPlace')}
            />
            <Input
              type="text"
              placeholder="Location"
              label="Location"
              name="location"
              onChange={changeFn('location')}
            />
            {responsibilities && (
              <ControlSection<Responsibilities_I>
                stateName="responsibilities"
                listItems={responsibilities}
                headingName="Responsibilities"
                bemClassName="responsibilities"
                getLabelText={(data) => data.data}
                sectionType="section--nested"
                updateFn={updateWorkXpProperty}
                addFn={defaultAddFn<Responsibilities_I>(
                  responsibilities,
                  'responsibilities',
                  updateWorkXpProperty,
                  defaultValues.workExperience.responsibilities
                )}
              >
                {(responsibilitiesId: number | null) => {
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
                            item.id === responsibilitiesId
                              ? Object.assign(item, {
                                data: e.target.value,
                              })
                              : item
                          ),
                        }
                        updateWorkXpProperty(updatedData)
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
      <CareerObjectives {...{ details, updateDetails }} />{' '}
      <CoreQualifications {...{ details, updateDetails }} />
      <Education {...{ details, updateDetails }} />
      <WorkExperience {...{ details, updateDetails }} />
    </div>
  )
}

export default { Previewer, Controls }
