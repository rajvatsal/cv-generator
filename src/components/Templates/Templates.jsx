import './Templates.scss'

import tmpl_1 from './TemplateOne/main.jsx'
import tmpl_2 from './TemplateTwo/main.jsx'
import tmpl_3 from './TemplateThree/main.jsx'
import { useState, useCallback } from 'react'
import { CommonControls } from './CommonControls.jsx'

const templates = [tmpl_1, tmpl_2, tmpl_3]

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

export function InitRender() {
  const [template, setTemplate] = useState('1')
  const updateTemplate = useCallback((val) => setTemplate(val))

  const { Controls, Previewer } = templates.find(
    (_, i) => i === Number.parseInt(template) - 1
  )

  return (
    <>
      <ControlsContainer setTemplate={updateTemplate}>
        <Controls />
      </ControlsContainer>
      <PreviewContainer>
        <Previewer />
      </PreviewContainer>
    </>
  )
}
