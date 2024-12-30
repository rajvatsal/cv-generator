export function ControlSection({
  stateName,
  listItems,
  headingName,
  bemClassName,
  updateFn,
  inputs,
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
        {listItems.map(({ id, data }) => {
          return (
            <li key={id}>
              <div className="checkbox-list strikethrough-checkbox-label--ps_before">
                <input
                  type="checkbox"
                  className="switchbox"
                  role="switch"
                  aria-checked="true"
                  onChange={(e) => {
                    const updatedData = listItems.map((objective) =>
                      objective.id === id
                        ? Object.assign({}, objective, {
                            isVisible: e.target.checked,
                          })
                        : objective
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
                  {`${data.slice(0, 30)}...`}
                </button>
              </div>
            </li>
          )
        })}
      </ol>
      <button
        className="main__controls__${bemClassName}__add-btn btn--primary-2"
        type="button"
        onClick={() => {
          const updatedData = listItems.slice()
          updatedData.push({
            id: updatedData[updatedData.length - 1].id + 1,
            data: 'new objective',
            isVisible: true,
          })
          updateFn({ [stateName]: updatedData })
        }}
      >
        Add
      </button>
    </div>
  )
}
