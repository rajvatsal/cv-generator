import { Previewer } from './previewer.jsx'
import { Controls } from './controls.jsx'

function Template(props) {
  return (
    <>
      <Controls {...props} />
      <Previewer />
    </>
  )
}

export default { Previewer, Controls }
