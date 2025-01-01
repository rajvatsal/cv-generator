function defaultAddFn() {
  const { listItems, stateName, updateFn, defaultValues } = this
  const updatedData = listItems.slice()
  const newData =
    listItems.length === 0
      ? defaultValues[stateName]
      : Object.assign({}, defaultValues[stateName], {
          id: listItems[listItems.length - 1].id + 1,
        })
  updatedData.push(Object.assign({}, defaultValues, newData))
  updateFn({ [stateName]: updatedData })
}
function defaultCheckboxFn(e) {
  const updatedData = this.listItems.map((dataItem) =>
    dataItem.id === this.id
      ? Object.assign({}, dataItem, {
          isVisible: e.target.checked,
        })
      : dataItem
  )
  this.updateFn({ [this.stateName]: updatedData })
}

export function ControlSection({
  stateName,
  listItems,
  headingName,
  bemClassName,
  updateFn,
  inputs,
  getLabel,
  addFn = defaultAddFn,
  checkboxFn = defaultCheckboxFn,
  defaultValues = {},
}) {
  return (
    <div>
      <h2>{headingName} #</h2>
      <dialog className={`dialog--${bemClassName}`}>
        <form method="dialog" action="#">
          {inputs}
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
      <ol>
        {listItems.map((section) => {
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
                  onClick={() => {
                    const dialog = document.querySelector(
                      `.dialog--${bemClassName}`
                    )

                    dialog.setAttribute('data-id', id)
                    dialog.showModal()
                  }}
                >
                  <img
                    src="/src/assets/edit.svg"
                    alt=""
                    className="icn-container--fade-in__icn"
                    aria-hidden="true"
                  />
                  {getLabel(section)}
                </button>
              </div>
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
        })}
      >
        Add
      </button>
    </div>
  )
}
