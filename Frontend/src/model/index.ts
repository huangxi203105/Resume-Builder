interface Stat {
  value: string;
  label: string;
  gradient: string;
}
interface CardProps {
  title?: string;
  description?: string;
  iconColor?: string;
  bgColor?: string;
  color?: string;
}


export const statsMap: Stat[] = [
  { value: '50K+', label: 'Resumes Created', gradient: 'from-violet-600 to-fuchsia-600' },
  { value: '4.9★', label: 'User Rating', gradient: 'from-orange-500 to-red-500' },
  { value: '5 Min', label: 'Build Time', gradient: 'from-emerald-500 to-teal-500' }
]

export const cardsMap: CardProps[] = [
  {
    title: 'Lightning Fast',
    description: 'Create a professional resume in minutes with our easy-to-use resume builder.',
    iconColor: '#9358ff',
    bgColor: 'bg-[#f5f5fe]',
  },
  {
    title: 'Pro Templates',
    description: 'Choose from dozens of recruiter-approved,industry-specific templates.',
    iconColor: '#f046e4',
    bgColor: 'bg-[#fef4fd]',
  },
  {
    title: 'Instant Export',
    description: 'Download your resume in PDF format with just one click.',
    iconColor: '#f76001',
    bgColor: 'bg-[#fef6ee]',
  },
]

export const Proficiency = [
  {
    value: 0,
    label: '了解',
    background: 'linear-gradient(135deg, #a3b3ff, #e0e0e0)',
    boxShadow: '0 0 18px rgba(192, 192, 192, 0.5) 0 0 10px rgba(255, 235, 150, 0.4) inset;'
  },
  {
    value: 1,
    label: '掌握',
    background: 'linear-gradient(135deg, #a684ff, #e0e0e0)',
    boxShadow: '0 0 18px rgba(255, 215, 0, 0.5)'
  },
  {
    value: 3,
    label: '熟练',
    background: 'linear-gradient(135deg, #8e51ff, #e0e0e0)',
    boxShadow: '0 0 18px rgba(160, 216, 255, 0.5)'
  },
  {
    value: 2,
    label: '精通',
    background: 'linear-gradient(135deg, #8022fe, #e0e0e0)',
    boxShadow: '0 0 18px rgba(160, 216, 255, 0.5)'
  }
]
export const Proficiency1 = [
  {
    value: 0,
    label: '了解',
    background: 'linear-gradient(135deg, #a3b3ff, #e0e0e0)',
    boxShadow: '0 0 18px rgba(192, 192, 192, 0.5) 0 0 10px rgba(255, 235, 150, 0.4) inset;'
  },
  {
    value: 1,
    label: '掌握',
    background: 'linear-gradient(135deg, #a684ff, #e0e0e0)',
    boxShadow: '0 0 18px rgba(255, 215, 0, 0.5)'
  },
  {
    value: 3,
    label: '熟练',
    background: 'linear-gradient(135deg, #8e51ff, #e0e0e0)',
    boxShadow: '0 0 18px rgba(160, 216, 255, 0.5)'
  },
  {
    value: 2,
    label: '精通',
    background: 'linear-gradient(135deg, #8022fe, #e0e0e0)',
    boxShadow: '0 0 18px rgba(160, 216, 255, 0.5)'
  }
]