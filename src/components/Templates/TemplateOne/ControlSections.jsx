import { ControlSection } from '../../ControlSection/ControlSection.jsx'

export function CareerObjectives({ details, updateDetails }) {
  const listItems = details.careerObjectives
  const bemClassName = 'career-objective'
  const stateName = 'careerObjectives'
  const headingName = 'Career Objectives'
  const updateFn = updateDetails

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
      {...{ listItems, bemClassName, stateName, headingName, updateFn, inputs }}
    />
  )
}
export function CoreQualifications({ details, updateDetails }) {
  const listItems = details.coreQualifications
  const bemClassName = 'core-qualifications'
  const stateName = 'coreQualifications'
  const headingName = 'Core Qualifications'
  const updateFn = updateDetails
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
      {...{ listItems, bemClassName, stateName, headingName, updateFn, inputs }}
    />
  )
}
export function Education() {}
