import { PersonalDetails } from '../../PersonalDetails/PersonalDetails.jsx'

export function Controls({ updateDetails }) {
  return (
    <div>
      <PersonalDetails updateDetails={updateDetails} />
    </div>
  )
}
