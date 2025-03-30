import { useState, createContext, useContext } from 'react'
import { Previewer } from './Preview.jsx'
import { Controls } from './Controls.jsx'

const details = {
  name: 'chiara allison',
  address: 'atlanta, ga 30310',
  phoneNumber: '+1 555-555-5555',
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
      data: 'Effective Communication',
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
      id: 1,
      isVisible: true,
      degree: 'Bachelor of Arts',
      date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      subject: 'English Literature',
      address: 'Georgia State University, Atalanta, GA',
      gpa: 3.9,
      extras: [
        {
          id: 1,
          bold: 'minor in creative writing',
          light: '',
          isVisible: true,
        },
        {
          id: 2,
          bold: 'english literature student club',
          light: '',
          isVisible: true,
        },
        {
          id: 3,
          bold: 'study abroad program',
          light: `"Victorian London's Underworld"- (Spring 2019)`,
          isVisible: true,
        },
      ],
      relevantCourseWork: [
        { id: 1, data: 'Shakespearean Studies', isVisible: true },
        { id: 2, data: 'Modernist Literature', isVisible: true },
        { id: 3, data: 'Postcolonial Literature', isVisible: true },
        { id: 4, data: 'American Literature', isVisible: true },
        { id: 5, data: 'Victorian Literature', isVisible: true },
      ],
    },
  ],
  workExperience: [
    {
      id: 1,
      startDate: `${new Date().getFullYear() - 1}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      endDate: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
      jobTitle: 'Teacher Assistant',
      workPlace: 'Georgia State University',
      location: 'Atlanta, GA',
      isVisible: true,
      responsibilities: [
        {
          id: 1,
          data: 'Assist students during office hours, providing guidance thatcontributed to a 10% increase in overall class participation',
          isVisible: true,
        },
        {
          id: 2,
          data: 'Collaborate with the professor to develop innovative lesson plans,resulting in a 25% increase in student engagement',
          isVisible: true,
        },
        {
          id: 3,
          data: 'Organize and lead study sessions, contributing to a 90% pass rate inthe final exam among participating students',
          isVisible: true,
        },
      ],
    },
  ],
}

export default { details, Previewer, Controls }
