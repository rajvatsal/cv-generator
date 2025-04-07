import './Main.scss'
import { useState, useEffect } from 'react'
import { templates, defaultData } from './Templates/Templates.tsx'
import TemplateSelector from './TemplateSelector.tsx'
import DownloadButton from './DownloadButton.tsx'

export enum OrientationPdf {
  Portrait,
  Landscpe,
}

function Main() {
  const [template, setTemplate] = useState<number>(1)
  const [details, setDetails] = useState(defaultData)
  const [pdfOrientation, setPdfOrientation] = useState<OrientationPdf>(
    OrientationPdf.Portrait
  )
  const [pdfMargin, setPdfMargin] = useState<number>(2)
  const previewClassName = `previewer--${pdfOrientation === OrientationPdf.Portrait ? 'portrait' : 'landscape'}`
  const { Controls, Previewer } = templates[template - 1]

  const updateDetails = (data) => {
    setDetails(Object.assign({}, details, data))
  }

  const updateTemplate = (val: number) => {
    setTemplate(val)
  }

  // update margin value in css
  useEffect(() => {
    const root: HTMLElement | null = document.querySelector(':root')
    if (root !== null) {
      root.style.setProperty('--pdf-margin', `${pdfMargin}cm`)
    }
  }, [pdfMargin])

  return (
    <main className="main">
      <div className="main__sidebar custom-scrollbar">
        <DownloadButton
          onMarginChange={setPdfMargin}
          onOrientationChange={setPdfOrientation}
          pdfOrientation={pdfOrientation}
          pdfMargin={pdfMargin}
        />
        <TemplateSelector updateTemplate={updateTemplate} />
        <Controls
          className="main__controls"
          updateDetails={updateDetails}
          details={details}
        />
      </div>
      <Previewer details={details} previewClassName={previewClassName} />
    </main>
  )
}

export default Main
