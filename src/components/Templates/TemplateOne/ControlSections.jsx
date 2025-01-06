import { useContext, createContext } from 'react'
import { defaultValues } from './defaultDetails.js'
import { ControlSection } from '../../ControlSection/ControlSection.jsx'
import { Input } from '../../Input/Input.jsx'

function CareerObjectives({ details, updateDetails }) {
  const listItems = details.careerObjectives
  const bemClassName = 'career-objective'
  const stateName = 'careerObjectives'
  const headingName = 'Career Objective'
  const updateFn = updateDetails
  const getLabelText = (data) => data.data

  const inputs = (
    <>
      <textarea
        className={`dialog--${bemClassName}__textarea`}
        name={bemClassName}
        rows="5"
        cols="33"
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
    <>
      <input
        type="text"
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

function ExtrasInputs({ id, updateFn, stateName, listItems }) {
  return (
    <>
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
    </>
  )
}

function RelevantCourseWorkInputs({ id, updateFn, stateName, listItems }) {
  return (
    <Input
      placeholder="Light Text"
      label="light"
      name="extras_light"
      onChange={(e) => {
        const relevantCourseWork = listItems.map((ext) =>
          ext.id !== id ? ext : Object.assign({}, ext, { data: e.target.value })
        )
        updateFn(Object.assign({}, { [stateName]: relevantCourseWork }))
      }}
    />
  )
}

function EdInputs({ bemClassName, listItems, updateFn, stateName }) {
  const dialog = document.querySelector(`.dialog--${bemClassName}`)

  const activeEducation =
    dialog === null ||
    dialog.getAttribute('data-id') === null ||
    listItems.length === 0
      ? null
      : listItems.find(
          (ed) => ed.id.toString() === dialog.getAttribute('data-id').toString()
        )

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
      if (ed.id.toString() !== activeEducation.id.toString()) return ed
      return Object.assign({}, ed, {
        [this.state]: this.getValue ? this.getValue(e) : e.target.value,
      })
    })
    updateFn({ [stateName]: updatedData })
  }

  return (
    <>
      <label className="label-hoz">
        Date
        <input
          type="date"
          name="degree start or end date"
          className="input--date"
          onChange={changeFn.bind({ state: 'date' })}
        />
      </label>
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
    </>
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
    updatedData.push(
      Object.assign({}, defaultValues[stateName], {
        id: listItems.length === 0 ? 1 : listItems[listItems.length - 1].id + 1,
      })
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
      }}
    />
  )
}

export default { CareerObjectives, CoreQualifications, Education }
