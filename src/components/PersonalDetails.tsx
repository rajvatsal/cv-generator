// FooBar_P === FooBAR_Props
interface PersonalDetails_P {
  updateDetails: (
    data: Partial<{
      name: string
      address: string
      phoneNumber: string
      email: string
    }>
  ) => void
}

function PersonalDetails({ updateDetails }: PersonalDetails_P) {
  return (
    <div className="main__controls_personal-details input-fields-container">
      <h2 className="main__controls__control-heading">Personal Detail #</h2>
      <div className="input-container">
        <input
          className="input-container__input"
          type="text"
          id="usr_name"
          name="usr_name"
          pattern="[a-zA-Z ]+"
          placeholder="Name *"
          onChange={(e) =>
            !e.target.validity.patternMismatch &&
            updateDetails({ name: e.target.value })
          }
          required
        />
        <label
          className="input-container__label"
          htmlFor="usr_name"
          data-help="¿Are you 11 from stranger things?"
        >
          Name
        </label>
      </div>

      <div className="input-container">
        <input
          className="input-container__input"
          type="text"
          id="usr_address"
          name="usr_address"
          pattern=".*"
          placeholder="Address"
          onChange={(e) =>
            e.target.validity.valid &&
            updateDetails({ address: e.target.value })
          }
        />
        <label
          className="input-container__label"
          htmlFor="usr_address"
          data-help=""
        >
          Address
        </label>
      </div>

      <div className="input-container">
        <input
          className="input-container__input"
          type="text"
          id="usr_number"
          name="usr_number"
          pattern=".*"
          placeholder="Phone Number *"
          onChange={(e) => {
            e.preventDefault()
            const pattern = /^\+[0-9]{1,2} [0-9]{3}-[0-9]{3}-[0-9]{4}$/
            const partialPattern =
              /^\+[0-9]{0,2}(?: [0-9]{0,3})?(?:-[0-9]{1,3})?(?:-[0-9]{1,4})?$/

            console.log(
              e.target.value.match(pattern),
              e.target.value.match(partialPattern)
            )

            if (
              e.target.value.match(pattern) ||
              e.target.value.match(partialPattern)
            ) {
              e.target.setCustomValidity('')
              updateDetails({ phoneNumber: e.target.value })
            } else e.target.setCustomValidity('not true')

            const isComplete = e.target.value.match(pattern) ? 'true' : 'false'
            e.target.setAttribute('data-complete', isComplete)
          }}
          onBlur={(e) =>
            e.target.setCustomValidity(
              e.target.getAttribute('data-complete') === 'true'
                ? ''
                : 'not true'
            )
          }
          required
        />
        <label
          className="input-container__label"
          htmlFor="usr_number"
          data-help="(format +CC NNN-NNN-NNNN)"
        >
          Number
        </label>
      </div>

      <div className="input-container">
        <input
          className="input-container__input"
          type="email"
          id="usr_mail"
          name="usr_mail"
          pattern=".*"
          placeholder="Mail *"
          onChange={(e) =>
            e.target.validity.valid && updateDetails({ email: e.target.value })
          }
          required
        />
        <label
          className="input-container__label"
          htmlFor="usr_mail"
          data-help="(example@mail.com)"
        >
          Mail
        </label>
      </div>
    </div>
  )
}

export default PersonalDetails
