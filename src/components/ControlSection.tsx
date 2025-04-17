import { useState, useRef } from 'react'
import { DefaultValues } from './Templates/defaultData.ts'
import editImg from '/src/assets/edit.svg'
import './ControlSection.scss'

// FooBar_P === FooBAR_Props
interface ControlSection_P<T, U> {
  stateName: string
  listItems: T[]
  bemClassName: string
  headingName: string
  children: (id: number | null) => JSX.Element
  getLabelText: (data: T) => string
  updateFn: (data: { [key: string]: T[] }) => void
  sectionType?: string
  addFn?: () => void
  defaultValues?: U | null
}

const MAX_LABEL_LENGTH = 25
const fallbackLabel = 'Empty :('
const isInvalidLabel = (l: string) => !l.split(' ').find((s) => s !== '')
const getLabel = (text: string) =>
  isInvalidLabel(text)
    ? fallbackLabel
    : text.length <= MAX_LABEL_LENGTH
      ? text
      : `${text.slice(0, MAX_LABEL_LENGTH)}...`

// TODO: Give more descriptive names to vars ex listItems
function ControlSection<T extends { id: number }, U = DefaultValues>({
  stateName,
  listItems,
  headingName,
  bemClassName,
  getLabelText,
  sectionType = 'section--primary',
  children,
  defaultValues = null,
  updateFn,
  addFn,
}: ControlSection_P<T, U>) {
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const updateEditingItem = (id: number | null = null) => setEditingItem(id)
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <div className="control-section">
      {sectionType === 'section--nested' ? (
        <h4 className="main__controls__control-heading">{headingName} #</h4>
      ) : (
        <h2 className="main__controls__control-heading">{headingName} #</h2>
      )}
      {sectionType === 'section--primary' ? (
        <dialog ref={dialog} className={`dialog--${bemClassName} primary-form`}>
          <form method="dialog" action="#">
            {children ? children(editingItem) : null}
            <div className="primary-form__button-container">
              <button
                type="button"
                className={`dialog--${bemClassName}__remove-btn btn--accent-light primary-form__btn--remove primary-form__btn`}
                onClick={() => {
                  //
                  // TODO: Fix id doesn't exist on type T
                  //
                  const updatedData = listItems.filter(
                    (obj) => obj.id !== editingItem
                  )
                  updateFn({ [stateName]: updatedData })
                  updateEditingItem()
                  dialog.current!.close()
                }}
              >
                Remove
              </button>
              <button
                type="submit"
                className={`dialog--${bemClassName}__close btn--secondary primary-form__btn--close primary-form__btn`}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      ) : null}
      <ol className="list--no-style control-section__input-container">
        {listItems.map((section) => {
          const editFn =
            sectionType === 'section--primary'
              ? () => {
                updateEditingItem(id)
                dialog.current!.showModal()
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const updatedData = listItems.map((dataItem) =>
                      dataItem.id === id
                        ? Object.assign({}, dataItem, {
                          isVisible: e.target.checked,
                        })
                        : dataItem
                    )

                    updateFn({ [stateName]: updatedData })
                  }}
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
                    src={editImg}
                    alt=""
                    className="icn-container--fade-in__icn"
                    aria-hidden="true"
                  />
                  {getLabel(getLabelText(section))}
                </button>
              </div>
              {sectionType === 'section--nested' && editingItem === id ? (
                <div className={`nested-inputs--${bemClassName} nested-form`}>
                  {children ? children(id) : null}
                  <button
                    type="button"
                    className="btn--accent nested-form__btn--remove"
                    onClick={() =>
                      updateFn({
                        [stateName]: listItems.filter((item) => item.id !== id),
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
      <button
        className="Localemain__controls__${bemClassName}__add-btn btn--add btn--primary-2 icons-container"
        type="button"
        onClick={
          addFn
            ? addFn
            : () => {
              const updatedData = listItems.slice()
              const newData: T =
                listItems.length === 0
                  ? defaultValues[stateName]
                  : Object.assign({}, defaultValues[stateName], {
                    id: listItems[listItems.length - 1].id + 1,
                  })

              updatedData.push(Object.assign({}, newData))
              updateFn({ [stateName]: updatedData })
            }
        }
      >
        <div className="btn--add__icn-container">
          <div className=" btn--add__icn--default btn--add__icn-container__icon-div">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <title>Add icon not hover</title>
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </div>
          <div className="btn--add__icn--hover btn--add__icn-container__icon-div">
            <svg
              className="icon "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <title>Add icon hover</title>
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <span className="btn--add__text">Add</span>
      </button>
    </div>
  )
}

export default ControlSection
