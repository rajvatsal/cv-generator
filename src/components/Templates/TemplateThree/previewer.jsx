export function Previewer({ details }) {
  return (
    <div>
      <h2>{details.name}</h2>
      <div>{details.address}</div>
      <span>{details.phoneNumber}</span>
    </div>
  )
}
