import './TemplateSelector.scss'

interface TemplateSelector_P {
  updateTemplate: (val: number) => void
}

function TemplateSelector({ updateTemplate }: TemplateSelector_P) {
  return (
    <div className="template-container">
      <input
        className="template-container__tmp_1 template-container__templates"
        type="radio"
        name="template"
        value="1"
        defaultChecked
        onChange={(e) => updateTemplate(Number.parseInt(e.target.value))}
      />
      <input
        className="template-container__tmp_1 template-container__templates"
        type="radio"
        name="template"
        value="2"
        onChange={(e) => updateTemplate(Number.parseInt(e.target.value))}
      />
      <input
        className="template-container__tmp_1 template-container__templates"
        type="radio"
        name="template"
        value="3"
        onChange={(e) => updateTemplate(Number.parseInt(e.target.value))}
      />
    </div>
  )
}

export default TemplateSelector
