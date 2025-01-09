import './Main.scss'
import { useState, useCallback } from 'react'
import { templates } from '../Templates/Templates.jsx'
import { TemplateSelector } from '../TemplateSelector/TemplateSelector.jsx'
import html2pdf from 'html2pdf.js'

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
        <button
          type="button"
          className="btn--primary icons-container btn--download"
          onClick={async () => {
            const preview = document.querySelector('.previewer')
            const name = document.querySelector(
              '.previewer__section--intro__name'
            )
            const opts = {
              margin: [1.58, 2],
              filename: `${name.textContent}.pdf`,
              image: { type: 'png' },
              html2canvas: {
                scale: 5,
              },
              jsPDF: {
                unit: 'cm',
                format: 'a4',
                putOnlyUsedFonts: true,
                orientation: 'portrait',
              },
            }

            await html2pdf().from(preview).set(opts).save()
          }}
        >
          <span className="btn--download__title">DOWNLOAD</span>
          <svg
            className="icon btn--download__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <title>download button icon</title>
            <path
              fillRule="evenodd"
              d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <TemplateSelector updateTemplate={updateTemplate} />
        <Controls
          className="main__controls"
          updateDetails={updateDetails}
          details={details}
        />
      </div>
      <Previewer details={details} />
    </main>
  )
}
