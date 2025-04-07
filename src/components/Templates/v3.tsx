function Previewer({ details }) {
  return (
    <div>
      <h2>{details.name}</h2>
      <div>{details.address}</div>
      <span>{details.phoneNumber}</span>
    </div>
  )
}

function Controls({ name, address, phoneNumber }) {
  return (
    <>
      <h2>{name}</h2>
      <div>{address}</div>
      <span>{phoneNumber}</span>
    </>
  )
}

export default { Previewer, Controls }
