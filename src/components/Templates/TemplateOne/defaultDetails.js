export const defaultValues =  {
  name: 'chiara allison',
  address: 'atlanta, ga 30310',
  phoneNumber: '+1 555-555-5555',
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
      extras: { id: 1, bold: 'minor in creative writing', light: '' ,isVisible: true} ,
      relevantCourseWork: { id: 1, data: 'Shakespearean Studies' , isVisible: true} ,
    },
  
  workExperience: 
  
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date(),
      jobTitle: 'Teacher Assistant',
      workPlace: 'Georgia State University',
      location: 'Atlanta, GA',
      responsibilities: {id: 1, data: 'blah', isVisible: true},
    },
  
}
