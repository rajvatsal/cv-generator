export const defaultValues =  {
  name: 'chiara allison',
  address: 'atlanta, ga 30310',
  phoneNumber: '(555)-555-5555',
  email: 'example@example.com',
  careerObjectives: 
    {
      id: 1,
      data: 'new objective',
      isVisible: true,
    },
  coreQualifications: 
    {
      id: 1,
      data: 'Critical analysis',
      isVisible: true,
    },
  education: 
    {
      id: 1,
      isVisible: true,
      degree: 'Bachelor of Science(hons)',
      date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      subject: 'Computer Science',
      address: 'Georgia State University, Atalanta, GA',
      gpa: 7,
      extras: [
      ],
      relevantCourseWork: [
      ],
    },
  
  workExperience: [
    {
      type: 'Teacher Assistant',
      uni: 'Georgia State University',
      location: 'Atlanta, GA',
    },
  ],
}
