export function Controls({ name, address, phoneNumber }) {
  return (
    <>
      <h2>{name}</h2>
      <div>{address}</div>
      <span>{phoneNumber}</span>
    </>
  )
}
