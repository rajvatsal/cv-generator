import './Main.scss'
import { templates } from '../Templates/Templates.jsx'
import { useState, useCallback } from 'react'
import { CommonControls } from '../Templates/CommonControls.jsx'

function ControlsContainer({ setTemplate, children }) {
  return (
    <div className="main__controls">
      {children}
      <CommonControls setTemplate={setTemplate} />
    </div>
  )
}

function PreviewContainer({ children }) {
  return <div className="main__previewer">{children}</div>
}

export function Main() {
  const [template, setTemplate] = useState('1')
  const updateTemplate = useCallback((val) => setTemplate(val))

  const { Controls, Previewer } = templates.find(
    (_, i) => i === Number.parseInt(template) - 1
  )
  return (
    <main className="main">
      <ControlsContainer setTemplate={updateTemplate}>
        <Controls />
      </ControlsContainer>
      <PreviewContainer>
        <Previewer />
      </PreviewContainer>
    </main>
  )
}
