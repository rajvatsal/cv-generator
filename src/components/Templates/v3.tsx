import { UserData } from './defaultData.ts'

function Previewer({ details }: { details: UserData }) {
  return (
    <div>
      <h2>{details.name}</h2>
      <div>{details.address}</div>
      <span>{details.phoneNumber}</span>
    </div>
  )
}

function Controls({ details }: { details: UserData }) {
  return (
    <>
      <h2>{details.name}</h2>
      <div>{details.address}</div>
      <span>{details.phoneNumber}</span>
    </>
  )
}

export default { Previewer, Controls }
