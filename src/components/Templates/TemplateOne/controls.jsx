import { PersonalDetails } from '../../PersonalDetails/PersonalDetails.jsx'

export function Controls({ details, updateDetails }) {
  return (
    <div>
      <PersonalDetails updateDetails={updateDetails} />
      <div className="main__controls__carrer-objective">
        <h2>Career Objective #</h2>
        <dialog className="dialog--career-objective">
          <form method="dialog" action="#">
            <textarea
              className="dialog--career-objective__textarea"
              name="career_objective"
              rows="5"
              cols="33"
              onChange={(e) => {
                const listId = e.target.getAttribute('data-id')
                const updatedObjective = {
                  careerObjectives: details.careerObjectives.map((obj) => {
                    if (listId !== obj.id.toString()) return obj
                    return Object.assign({}, obj, { data: e.target.value })
                  }),
                }
                updateDetails(updatedObjective)
              }}
            />
            <button
              type="button"
              className="dialog--career-objective__remove-btn btn--accent-light"
              onClick={() => {
                const dialog = document.querySelector(
                  '.dialog--career-objective'
                )
                const id = dialog
                  .querySelector('textarea')
                  .getAttribute('data-id')

                const updatedObjectives = details.careerObjectives.filter(
                  (obj) => obj.id.toString() !== id
                )
                console.log(id)
                updateDetails({ careerObjectives: updatedObjectives })
                dialog.close()
              }}
            >
              Remove
            </button>
            <button
              type="submit"
              className="dialog--career-objective__close btn--secondary"
            >
              Close
            </button>
          </form>
        </dialog>
        <ol>
          {details.careerObjectives.map(({ id, data }) => {
            return (
              <li key={id}>
                <div className="checkbox-list strikethrough-checkbox-label--ps_before">
                  <input
                    type="checkbox"
                    className="switchbox"
                    role="switch"
                    aria-checked="true"
                    onChange={(e) => {
                      const updatedObjectives = details.careerObjectives.map(
                        (objective) =>
                          objective.id === id
                            ? Object.assign({}, objective, {
                                isVisible: e.target.checked,
                              })
                            : objective
                      )
                      updateDetails({ careerObjectives: updatedObjectives })
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
                        '.dialog--career-objective'
                      )

                      dialog
                        .querySelector('textarea')
                        .setAttribute('data-id', id)
                      dialog.showModal()
                    }}
                  >
                    <img
                      src="https://via.placeholder.com/150"
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
          className="main__controls__career-objective__add-btn btn--primary-2"
          type="button"
          onClick={() => {
            const updatedObjectives = details.careerObjectives.slice()
            updatedObjectives.push({
              id: updatedObjectives[updatedObjectives.length - 1].id + 1,
              data: 'new objective',
              isVisible: true,
            })
            updateDetails({ careerObjectives: updatedObjectives })
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
}
