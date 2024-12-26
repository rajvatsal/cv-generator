import { memo } from 'react'
import './TemplateSelector.scss'

export const TemplateSelector = memo(({ setTemplate }) => {
  return (
    <div className="template-container">
      <input
        className="template-container__tmp_1 template-container__templates"
        type="radio"
        name="template"
        value="1"
        defaultChecked
        onChange={(e) => setTemplate(e.target.value)}
      />
      <input
        className="template-container__tmp_1 template-container__templates"
        type="radio"
        name="template"
        value="2"
        onChange={(e) => setTemplate(e.target.value)}
      />
      <input
        className="template-container__tmp_1 template-container__templates"
        type="radio"
        name="template"
        value="3"
        onClick={(e) => setTemplate(e.target.value)}
      />
    </div>
  )
})
