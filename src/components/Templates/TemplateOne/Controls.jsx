import { PersonalDetails } from '../../PersonalDetails/PersonalDetails.jsx'
import { useContext, createContext } from 'react'
import { defaultValues } from './defaultDetails.js'
import { ControlSection } from '../../ControlSection/ControlSection.jsx'
import { Input, Textarea } from '../../Input/Input.jsx'

function CareerObjectives({ details, updateDetails }) {
  const listItems = details.careerObjectives
  const bemClassName = 'career-objective'
  const stateName = 'careerObjectives'
  const headingName = 'Career Objective'
  const updateFn = updateDetails
  const getLabelText = (data) => data.data

  const inputs = (
    <>
      <h4 className="main__controls__control-heading">Goal #</h4>
      <Textarea
        className={`dialog--${bemClassName}__textarea`}
        name={bemClassName}
        label="Goal"
        placeholder="Describe your career goal"
        extras={{ rows: '5', cols: '33' }}
        onChange={(e) => {
          const dialog = document.querySelector(`.dialog--${bemClassName}`)
          const listId = dialog.getAttribute('data-id')
          const updatedData = {
            [stateName]: listItems.map((data) => {
              if (listId !== data.id.toString()) return data
              return Object.assign({}, data, { data: e.target.value })
            }),
          }
          updateFn(updatedData)
        }}
      />
    </>
  )

  return (
    <ControlSection
      {...{
        listItems,
        bemClassName,
        stateName,
        headingName,
        updateFn,
        inputs,
        getLabelText,
        defaultValues,
      }}
    />
  )
}
function CoreQualifications({ details, updateDetails }) {
  const listItems = details.coreQualifications
  const bemClassName = 'core-qualifications'
  const stateName = 'coreQualifications'
  const headingName = 'Core Qualification'
  const updateFn = updateDetails
  const getLabelText = (data) => data.data

  const inputs = (
    <div className="input-fields-container">
      <h4 className="main__controls__control-heading">Qualification #</h4>
      <Input
        placeholder="Quailification"
        label="Quailification"
        onChange={(e) => {
          const dialog = document.querySelector(`.dialog--${bemClassName}`)
          const id = dialog.getAttribute('data-id')
          const updatedData = listItems.map((data) =>
            data.id.toString() !== id
              ? data
              : Object.assign({}, data, { data: e.target.value })
          )

          updateFn({ [stateName]: updatedData })
        }}
      />
    </div>
  )

  return (
    <ControlSection
      {...{
        listItems,
        bemClassName,
        stateName,
        headingName,
        updateFn,
        inputs,
        getLabelText,
        defaultValues,
      }}
    />
  )
}

function ExtrasInputs({ id, updateFn, stateName, listItems }) {
  return (
    <div className="input-fields-container">
      <Input
        placeholder="Bold Text"
        label="bold"
        name="extras_bold"
        onChange={(e) => {
          const extras = listItems.map((ext) =>
            ext.id !== id
              ? ext
              : Object.assign({}, ext, { bold: e.target.value })
          )
          updateFn(Object.assign({}, { [stateName]: extras }))
        }}
      />
      <Input
        placeholder="Light Text"
        label="light"
        name="extras_light"
        onChange={(e) => {
          const extras = listItems.map((ext) =>
            ext.id !== id
              ? ext
              : Object.assign({}, ext, { light: e.target.value })
          )
          updateFn(Object.assign({}, { [stateName]: extras }))
        }}
      />
    </div>
  )
}

function RelevantCourseWorkInputs({ id, updateFn, stateName, listItems }) {
  return (
    <Input
      placeholder="Relevant Coursework"
      label="Relevant Coursework"
      name="relevantCourseWork"
      onChange={(e) => {
        const relevantCourseWork = listItems.map((ext) =>
          ext.id !== id ? ext : Object.assign({}, ext, { data: e.target.value })
        )
        updateFn(Object.assign({}, { [stateName]: relevantCourseWork }))
      }}
    />
  )
}

function EdInputs({ id, bemClassName, listItems, updateFn, stateName }) {
  const dialog = document.querySelector(`.dialog--${bemClassName}`)

  const activeEducation = listItems.find((item) => item.id === id)

  const edUpdateFn = (updatedEd) =>
    updateFn({
      [stateName]: listItems.map((ed) =>
        ed.id === activeEducation.id ? Object.assign({}, ed, updatedEd) : ed
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
        placeholder="Degree"
        label="Degree"
        name="degree"
        onChange={changeFn.bind({ state: 'degree' })}
      />
      <Input
        placeholder="Subject"
        label="Subject"
        name="subject"
        onChange={changeFn.bind({ state: 'subject' })}
      />
      <Input
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
          Inputs={ExtrasInputs}
          sectionType="section--nested"
          defaultValues={defaultValues.education}
        />
      )}
      {relevantCourseWork && (
        <ControlSection
          listItems={relevantCourseWork}
          stateName="relevantCourseWork"
          headingName="Relevant Course Work"
          bemClassName="relevant-course-work"
          updateFn={edUpdateFn}
          getLabelText={(data) => data.data}
          Inputs={RelevantCourseWorkInputs}
          sectionType="section--nested"
          defaultValues={defaultValues.education}
          nestedParentId={dialog.getAttribute('data-id')}
        />
      )}
    </div>
  )
}

function Education({ updateDetails, details }) {
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
        Inputs: EdInputs,
        getLabelText,
        addFn,
        defaultValues,
      }}
    />
  )
}

function ResponsibilitiesInputs({ listItems, updateFn, stateName, id }) {
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
          [stateName]: listItems.map((item) =>
            item.id === id
              ? Object.assign({}, item, { data: e.target.value })
              : item
          ),
        }
        updateFn(updatedData)
      }}
    />
  )
}

function WorkExperienceInputs({ listItems, id, updateFn, stateName }) {
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

  function changeFn(e) {
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
        placeholder="Job Title"
        label="Job Title"
        name="job_title"
        onChange={changeFn.bind({ state: 'jobTitle' })}
      />
      <Input
        placeholder="Work Place"
        label="Work Place"
        name="work_place"
        onChange={changeFn.bind({ state: 'workPlace' })}
      />
      <Input
        placeholder="Location"
        label="Location"
        name="location"
        onChange={changeFn.bind({ state: 'location' })}
      />
      {responsibilities && (
        <ControlSection
          stateName="responsibilities"
          Inputs={ResponsibilitiesInputs}
          listItems={responsibilities}
          headingName="Work Experience"
          bemClassName="work-experience"
          getLabelText={(data) => data.data}
          sectionType="section--nested"
          defaultValues={defaultValues.workExperience}
          updateFn={weUpdateFn}
        />
      )}
    </div>
  )
}

function WorkExperience({ updateDetails, details }) {
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
        Inputs: WorkExperienceInputs,
        defaultValues,
      }}
    />
  )
}

export function Controls({ details, updateDetails }) {
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
