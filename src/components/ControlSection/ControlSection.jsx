import { useState } from 'react'

function NestedForm({
  bemClassName,
  listItems,
  updateFn,
  stateName,
  Inputs,
  inputs,
  id,
}) {
  return (
    <div className={`nested-inputs--${bemClassName}`}>
      {inputs !== null ? (
        inputs
      ) : (
        <Inputs {...{ id, bemClassName, listItems, updateFn, stateName }} />
      )}
      <button
        type="button"
        className="btn--accent"
        onClick={() =>
          updateFn({ [stateName]: listItems.filter((item) => item.id !== id) })
        }
      >
        Remove
      </button>
    </div>
  )
}

function PrimaryForm({
  bemClassName,
  listItems,
  updateFn,
  stateName,
  Inputs,
  inputs,
}) {
  return (
    <dialog className={`dialog--${bemClassName}`}>
      <form method="dialog" action="#">
        {inputs !== null ? (
          inputs
        ) : (
          <Inputs
            {...{
              bemClassName,
              listItems,
              updateFn,
              stateName,
            }}
          />
        )}
        <button
          type="button"
          className={`dialog--${bemClassName}__remove-btn btn--accent-light`}
          onClick={() => {
            const dialog = document.querySelector(`.dialog--${bemClassName}`)
            const id = dialog.getAttribute('data-id')

            const updatedData = listItems.filter(
              (obj) => obj.id.toString() !== id
            )
            updateFn({ [stateName]: updatedData })
            dialog.close()
          }}
        >
          Remove
        </button>
        <button
          type="submit"
          className={`dialog--${bemClassName}__close btn--secondary`}
        >
          Close
        </button>
      </form>
    </dialog>
  )
}

function showDialog() {
  const dialog = document.querySelector(`.dialog--${this.bemClassName}`)
  dialog.setAttribute('data-id', this.id)
  dialog.showModal()
}

function defaultAddFn() {
  const { listItems, stateName, updateFn, defaultValues } = this

  const updatedData = listItems.slice()
  const newData =
    listItems.length === 0
      ? defaultValues[stateName]
      : Object.assign({}, defaultValues[stateName], {
          id: listItems[listItems.length - 1].id + 1,
        })

  updatedData.push(Object.assign({}, newData))
  updateFn({ [stateName]: updatedData })
}

function defaultCheckboxFn(e) {
  const { listItems, id, updateFn, stateName } = this
  const updatedData = listItems.map((dataItem) =>
    dataItem.id === id
      ? Object.assign({}, dataItem, {
          isVisible: e.target.checked,
        })
      : dataItem
  )

  updateFn({ [stateName]: updatedData })
}

const MAX_LABEL_LENGTH = 25
const fallbackLabel = 'Empty :('
const isInvalidLabel = (l) => !l.split(' ').find((s) => s !== '')
const getLabel = (text) =>
  isInvalidLabel(text)
    ? fallbackLabel
    : text.length <= MAX_LABEL_LENGTH
      ? text
      : `${text.slice(0, MAX_LABEL_LENGTH)}...`

export function ControlSection({
  stateName,
  listItems,
  headingName,
  bemClassName,
  updateFn,
  getLabelText,
  Inputs,
  inputs = null,
  addFn = defaultAddFn,
  checkboxFn = defaultCheckboxFn,
  defaultValues = {},
  sectionType = 'section--primary',
}) {
  const [editingItem, setEditingItem] = useState(null)
  const updateEditingItem = (id = null) => setEditingItem(id)

  return (
    <div>
      {sectionType === 'section--nested' ? (
        <h4>{headingName} #</h4>
      ) : (
        <h2>{headingName} #</h2>
      )}
      {sectionType === 'section--primary' ? (
        <PrimaryForm
          {...{
            bemClassName,
            listItems,
            stateName,
            updateFn,
            Inputs,
            inputs,
          }}
        />
      ) : null}
      <ol>
        {listItems.map((section) => {
          const editFn =
            sectionType === 'section--primary'
              ? () => {
                  updateEditingItem(id)
                  showDialog.call({ bemClassName, id })
                }
              : () => updateEditingItem(id === editingItem ? null : id)

          const { id } = section
          return (
            <li key={id}>
              <div className="checkbox-list strikethrough-checkbox-label--ps_before">
                <input
                  type="checkbox"
                  className="switchbox"
                  role="switch"
                  aria-checked="true"
                  onChange={checkboxFn.bind({
                    listItems,
                    id,
                    stateName,
                    updateFn,
                  })}
                  defaultChecked
                />
                <button
                  type="button"
                  data-id={id}
                  aria-label="edit"
                  className="cv-ctrls--list-item__btn--edit icn-container--fade-in"
                  onClick={editFn.bind({
                    id,
                    bemClassName,
                  })}
                >
                  <img
                    src="/src/assets/edit.svg"
                    alt=""
                    className="icn-container--fade-in__icn"
                    aria-hidden="true"
                  />
                  {getLabel(getLabelText(section))}
                </button>
              </div>
              {sectionType === 'section--nested' && editingItem === id ? (
                <NestedForm
                  data-id={id}
                  {...{
                    bemClassName,
                    listItems,
                    updateFn,
                    stateName,
                    Inputs,
                    inputs,
                    id,
                  }}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
      <button
        className="Localemain__controls__${bemClassName}__add-btn btn--primary-2"
        type="button"
        onClick={addFn.bind({
          defaultValues,
          listItems,
          updateFn,
          stateName,
          editingItem,
        })}
      >
        Add
      </button>
    </div>
  )
}
