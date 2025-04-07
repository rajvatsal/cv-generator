import './DownloadButton.scss'
import { SetStateAction, useState } from 'react'
import { Range } from './generals/Range.tsx'
import { Select } from './generals/Select.tsx'
import { OrientationPdf } from './Main.tsx'
// add types to this package
import html2pdf from 'html2pdf.js'

interface DownloadBtnProps {
  pdfMargin: number
  pdfOrientation: OrientationPdf
  onOrientationChange: React.Dispatch<SetStateAction<number>>
  onMarginChange: React.Dispatch<SetStateAction<number>>
}

interface PdfOptsProps {
  isVisible: boolean
  pdfMargin: number
  pdfOrientation: OrientationPdf
  toggleVisibility: () => void
  onOrientationChange: React.Dispatch<SetStateAction<number>>
  onMarginChange: React.Dispatch<SetStateAction<number>>
}

async function downloadPdf() {
  const marginOffset = 0.48
  const preview = document.querySelector('.previewer')
  const name = document.querySelector('.previewer__section--intro__name')
  const scale = Number.parseFloat(
    (document.querySelector("[name='pdf_quality']") as HTMLInputElement).value
  )
  const margin = Number.parseFloat(
    (document.querySelector("[name='pdf_margin']") as HTMLInputElement).value
  )
  const orientation = (
    document.querySelector(
      '.pdf-options__section--orientation #dropdown-button'
    ) as HTMLButtonElement
  ).textContent

  const opts = {
    margin: [margin - marginOffset, margin],
    filename: `${name ? name.textContent : 'name'}.pdf`,
    image: { type: 'png' },
    html2canvas: {
      scale: scale,
    },
    jsPDF: {
      unit: 'cm',
      format: 'a4',
      putOnlyUsedFonts: true,
      orientation: orientation,
    },
  }
  await html2pdf().from(preview).set(opts).save()
}

function downloadButtonClickHandler(togglePdfOptsVisibility: () => void) {
  return () => togglePdfOptsVisibility()
}

function PdfOpts({
  isVisible,
  pdfOrientation,
  pdfMargin,
  toggleVisibility,
  onOrientationChange,
  onMarginChange,
}: PdfOptsProps) {
  if (!isVisible) return null

  const selectOpts = ['Landscape', 'Portrait']
  return (
    <form action="#" method="post" className="pdf-options">
      <div className="pdf-options__section--quality pdf-options__section">
        <h2 className="heading--v2">
          Quality<i>(Recommended 5)</i>
        </h2>
        <Range min={2} max={10} step={0.1} name="pdf_quality" value={5} />
      </div>
      <div className="pdf-options__section--margin pdf-options__section">
        <h2 className="heading--v2">
          Margin <i>(Recommended 2cm)</i>
        </h2>
        <Range
          max={5}
          step={0.1}
          name="pdf_margin"
          value={pdfMargin}
          suffix="cm"
          onChange={onMarginChange}
        />
      </div>
      <div className="pdf-options__section--orientation pdf-options__section">
        <h2 className="heading--v2">Orientation</h2>
        <Select
          options={selectOpts}
          version="v2"
          onChange={(e: string) => {
            onOrientationChange(
              e === 'Portrait'
                ? OrientationPdf.Portrait
                : OrientationPdf.Landscpe
            )
          }}
          selected={selectOpts.findIndex(
            (item) =>
              item.toLowerCase() ===
              (pdfOrientation === OrientationPdf.Portrait
                ? 'portrait'
                : 'landscape')
          )}
        />
      </div>
      <div className="pdf-options__section--buttons pdf-options__section">
        <button
          type="button"
          className="btn--secondary pdf-options__section--buttons__submit"
          onClick={() => toggleVisibility()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn--primary pdf-options__section--buttons__cancel"
          onClick={async () => {
            await downloadPdf()
            toggleVisibility()
          }}
        >
          Save
        </button>
      </div>
    </form>
  )
}

function DownloadButton({
  onOrientationChange,
  onMarginChange,
  pdfMargin,
  pdfOrientation,
}: DownloadBtnProps) {
  const [pdfOptsVisibility, setPdfOptsVisibility] = useState<boolean>(false)
  const togglePdfOptsVisibility = () => {
    setPdfOptsVisibility(!pdfOptsVisibility)
  }

  return (
    <>
      <PdfOpts
        isVisible={pdfOptsVisibility}
        toggleVisibility={togglePdfOptsVisibility}
        {...{ onOrientationChange, onMarginChange, pdfMargin, pdfOrientation }}
      />
      <button
        type="button"
        className="btn--primary icons-container btn--download"
        onClick={downloadButtonClickHandler(togglePdfOptsVisibility)}
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
    </>
  )
}

export default DownloadButton
