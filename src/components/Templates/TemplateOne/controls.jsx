import { PersonalDetails } from '../../PersonalDetails/PersonalDetails.jsx'
import {
  CareerObjectives,
  CoreQualifications,
  Education,
} from './ControlSections.jsx'

export function Controls({ details, updateDetails }) {
  return (
    <div>
      <PersonalDetails updateDetails={updateDetails} />
      <CareerObjectives
        className="main__controls__career-objectives"
        details={details}
        updateDetails={updateDetails}
      />
      <CoreQualifications
        className="main__controls__core-qualifications"
        details={details}
        updateDetails={updateDetails}
      />
    </div>
  )
}
