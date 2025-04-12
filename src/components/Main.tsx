import './Main.scss'
import { useState, useEffect } from 'react'
import { templates } from './Templates/Templates.tsx'
import { defaultData, UserData } from './Templates/defaultData.ts'
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

  const updateDetails = (data: Partial<UserData>) => {
    setDetails(Object.assign({}, details, data))
  }

  const updateTemplate = (val: number) => {
    setTemplate(val)
  }

  // update margin value in css
  useEffect(() => {
    const root: HTMLElement = document.querySelector(':root')!
    root.style.setProperty('--pdf-margin', `${pdfMargin}cm`)
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
        <Controls updateDetails={updateDetails} details={details} />
      </div>
      <Previewer details={details} previewClassName={previewClassName} />
    </main>
  )
}

export default Main
