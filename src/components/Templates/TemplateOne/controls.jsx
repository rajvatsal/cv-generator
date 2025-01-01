import { PersonalDetails } from '../../PersonalDetails/PersonalDetails.jsx'
import sections from './ControlSections.jsx'

const getClassName = (word) =>
  word
    .split('')
    .map((ch, i) => (ch === ch.toUpperCase() && i !== 0 ? `-${ch}` : ch))
    .join('')
    .toLowerCase()

const getSections = (details, updateDetails) => {
  const cmps = []
  for (const section in sections) {
    const Cmp = sections[section]
    cmps.push(
      <Cmp
        className={`main__controls__${getClassName(section)}`}
        {...{ details, updateDetails }}
      />
    )
  }
  return cmps
}

export function Controls({ details, updateDetails }) {
  return (
    <div>
      <PersonalDetails updateDetails={updateDetails} />
      {getSections(details, updateDetails)}
    </div>
  )
}
