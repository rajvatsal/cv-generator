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
  coreQualifications: [
    {
      id: 1,
      data: 'Critical analysis',
      isVisible: true,
    },
    {
      id: 2,
      data: 'Critical analysis',
      isVisible: true,
    },
    {
      id: 3,
      data: 'Research proficiency',
      isVisible: true,
    },
    {
      id: 4,
      data: 'Literary theory knowledge',
      isVisible: true,
    },
    {
      id: 5,
      data: 'Creative thinking',
      isVisible: true,
    },
  ],
  education: [
    {
      degree: 'Bachelor of Arts',
      finished: false,
      date: 'June 2024',
      subject: 'English Literature',
      address: 'Georgia State University, Atalanta, GA',
      gpa: 3.9,
      extras: [
        ['minor in creative writing'],
        ['english literature student club'],
        [
          'study abroad program',
          `"Victorian London's Underworld"- (Spring 2019)`,
        ],
      ],
      relevantCourseWork: [
        'Shakespearean Studies',
        'Modernist Literature',
        'Postcolonial Literature',
        'American Literature',
        'Victorian Literature',
      ],
    },
  ],
  workExperience: [
    {
      type: 'Teacher Assistant',
      uni: 'Georgia State University',
      location: 'Atlanta, GA',
    },
  ],
}

export default { details, Previewer, Controls }
