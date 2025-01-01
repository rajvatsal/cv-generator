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
  const getLabel = (section) => `${section.data.slice(0, 30)}...`

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
        getLabel,
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
  const getLabel = ({ data }) => {
    return `${data.slice(0, 30)}${data.length > 30 ? '...' : ''}`
  }
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
        getLabel,
        defaultValues,
      }}
    />
  )
}

function Education({ updateDetails, details }) {
  const listItems = details.education
  const bemClassName = 'education'
  const stateName = 'education'
  const headingName = 'Education'
  const updateFn = updateDetails
  const getLabel = ({ degree }) =>
    `${degree.slice(0, 30)}${degree.length > 30 ? '...' : ''}`

  function addFn() {
    const updatedData = listItems.slice()
    updatedData.push(
      Object.assign({}, defaultValues[stateName], {
        id: listItems.length === 0 ? 0 : listItems[listItems.length - 1].id + 1,
      })
    )
    updateFn({ education: updatedData })
  }

  function changeFn(e) {
    const id = document
      .querySelector(`.dialog--${bemClassName}`)
      .getAttribute('data-id')
    const updatedData = listItems.map((ed) => {
      if (ed.id.toString() !== id.toString()) return ed
      return Object.assign({}, ed, {
        [this.state]: this.getValue ? this.getValue(e) : e.target.value,
      })
    })
    updateFn({ [stateName]: updatedData })
  }
  const inputs = (
    <>
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
      <label className="label-hoz">
        Date
        <input
          type="date"
          name="degree start or end date"
          className="input--date"
          onChange={changeFn.bind({ state: 'date' })}
        />
      </label>
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
        getLabel,
        addFn,
      }}
    />
  )
}

export default { CareerObjectives, CoreQualifications, Education }
