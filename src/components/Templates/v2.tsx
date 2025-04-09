import { UserData } from './defaultData.ts'

function Previewer({ details }: { details: UserData }) {
  return (
    <div>
      <h2>{details.name}</h2>
      <div>{details.address}</div>
    </div>
  )
}

function Controls() {
  return (
    <div>
      <h5>Controls me</h5>
    </div>
  )
}

export default { Previewer, Controls }
