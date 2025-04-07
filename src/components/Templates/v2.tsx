function Previewer({ details }) {
  return (
    <div>
      <h2>{details.name}</h2>
      <div>{details.address}</div>
    </div>
  )
}

function Controls({ updateTemplate, updateData, CommonControls }) {
  return (
    <div>
      <h5>Controls me</h5>
    </div>
  )
}

export default { Previewer, Controls }
