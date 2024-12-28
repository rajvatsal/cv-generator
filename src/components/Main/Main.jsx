import './Main.scss'
import { useState, useCallback } from 'react'
import { templates } from '../Templates/Templates.jsx'
import { TemplateSelector } from '../TemplateSelector/TemplateSelector.jsx'

export function Main() {
  const [template, setTemplate] = useState('1')
  const [details, setDetails] = useState(
    templates[Number.parseInt(template) - 1].details
  )

  const { Controls, Previewer } = templates[Number.parseInt(template) - 1]

  const updateDetails = (data) => {
    setDetails(Object.assign({}, details, data))
  }

  const updateTemplate = (val) => {
    const templateCount = Number.parseInt(val)
    setTemplate(Number.parseInt(templateCount))
  }

  return (
    <main className="main">
      <div className="main__sidebar">
        <TemplateSelector updateTemplate={updateTemplate} />
        <Controls className="main__controls" updateDetails={updateDetails} />
      </div>
      <Previewer className="main__preview" details={details} />
    </main>
  )
}
