import { useState } from 'react'
import { Previewer } from './previewer.jsx'
import { Controls } from './controls.jsx'

const details = {
  name: 'chiara allison',
  address: 'atlanta, ga 30310',
  phoneNumber: '(555)-555-5555',
  email: 'example@example.com',
  careerObjectives: [
    {
      id: 1,
      data: 'Versatile English literature student equipped with a diverse understandingof the writing process, literary genres, historical contexts and criticaltheories. Through academic pursuits, I have honed my ability to articulatecomplex ideas coherently, excited to apply my well-developed research and communication skills in a professional setting that values creativity andintellectual curiosity.',
      isVisible: true,
    },
  ],
  coreQualifications: [],
  education: [{ type: 'Bachelors', finished: false }],
  workExperience: [
    {
      type: 'Teacher Assistant',
      uni: 'Georgia State University',
      location: 'Atlanta, GA',
    },
  ],
}

export default { details, Previewer, Controls }
