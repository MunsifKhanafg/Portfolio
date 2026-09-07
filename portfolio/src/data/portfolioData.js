// ────────────────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth
//  Edit this file to update your name, bio, projects, skills, timeline,
//  and links. No other file needs to change for content updates.
// ────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Munsif Khan',
  initials: 'MK',
  title: 'MERN Stack Developer & CS Student',
  tagline: 'Building fast, real-time, production-grade web applications.',
  location: 'Landi Kotal, Khyber Pakhtunkhwa, Pakistan',
  status: 'Open to Opportunities',
  email: 'munsifkhanafg@gmail.com',
  phone: '+92 309 9367750',
  // Your photos — add 1 or more. They'll auto-rotate with a crossfade in
  // the About section. Drop image files into /public (e.g. /public/photos/
  // photo-1.jpg) and list their paths here, in the order they should cycle.
  // Leave the array empty to keep the initials avatar instead.
  photos: ['/photos/profile1.jpeg', '/photos/profile2.jpeg', '/photos/profile3.jpeg'],
  bio: [
    "I'm a full-stack developer working across the MERN stack — React, Node.js, Express, and MongoDB — with a focus on real-time systems and interfaces that feel considered rather than default.",
    "Currently in my 7th semester of a BS in Computer Science, I split my time between coursework and shipping complete, working products: a restaurant POS with live order tracking over Socket.io, a service-booking platform, a property-rental dashboard, and more.",
    "I care about the details most people skip — route ordering that doesn't break in production, state that stays in sync across screens, and UI that respects the person using it.",
  ],
  resumeUrl: '',
}

export const socials = [
  { label: 'GitHub', url: 'https://github.com/MunsifKhanafg', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/munsifkhan/', icon: 'linkedin' },
  { label: 'Phone', url: 'tel:+923099367750', icon: 'phone' },
  { label: 'Email', url: 'mailto:munsifkhanafg@gmail.com', icon: 'mail' },
]

// ── Bento grid content for the About section ──────────────────────────────
export const bento = {
  stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'Socket.io'],
  currentlyLearning: ['Mobile App Development', 'Game Development', 'System Design'],
  stats: [
    { label: 'Semester', value: '7th / 8' },
    { label: 'Program', value: 'BS CS' },
    { label: 'Since', value: '2023' },
  ],
  hobbies: ['Shipping side projects', 'Reading about system design', 'Exploring new frameworks'],
}

// ── Projects ────────────────────────────────────────────────────────────
// Add a new project by copying an existing object below. `images` is an
// array — 1 photo just displays normally, 2+ auto-rotate with a crossfade
// on the card. Leave it empty to use the generated gradient placeholder
// card instead of screenshots.
export const projects = [
  {
    id: 'aurum-dining',
    name: 'Aurum Dining',
    description:
      'A real-time restaurant POS and management system with a live kitchen display, guest ordering with countdown timers, delivery tracking, and admin-configurable digital payments.',
    longDescription:
      'Built from the ground up on the MERN stack with Socket.io powering a real-time kitchen display system. Includes role-based staff access, table management, guest order flows, cook-time estimation with live progress bars, and a full light/dark theme system.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux'],
    github: '',
    live: 'https://restaurant-frontend-five-psi.vercel.app/',
    images: [
      '/projects/aurum-dining-1.PNG',
      '/projects/aurum-dining-2.PNG',
      '/projects/aurum-dining-3.PNG',
      '/projects/aurum-dining-4.PNG',
      '/projects/aurum-dining-5.PNG',
      '/projects/aurum-dining-7.PNG',
      '/projects/aurum-dining-8.PNG',
      '/projects/aurum-dining-9.PNG',
    ],
    featured: true,
  },
  {
    id: 'smart-appointment-booking',
    name: 'Smart Appointment Booking',
    description:
      'A booking platform for scheduling appointments with real-time availability, designed to remove the back-and-forth of manual scheduling.',
    longDescription:
      'A streamlined appointment-booking system covering slot availability, booking confirmation, and a clean scheduling flow for both clients and providers.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: '',
    live: 'https://smart-appointment-booking.vercel.app/',
    images: [
      '/projects/smart-appointment-booking-1.PNG',
      '/projects/smart-appointment-booking-2.PNG',
      '/projects/smart-appointment-booking-3.PNG',
      '/projects/smart-appointment-booking-4.PNG',
    ],
    featured: true,
  },
  {
    id: 'service-booking-app',
    name: 'Service Booking App',
    description:
      'A platform connecting customers with service providers, handling browsing, booking, and appointment management end-to-end.',
    longDescription:
      'Covers the full booking lifecycle — browsing available services, selecting time slots, and confirming appointments — with a clean, mobile-first interface.',
    tags: ['React', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/MunsifKhanafg/service-booking-app',
    live: 'https://munsifkhanafg.github.io/service-booking-app/',
    images: [
      '/projects/service-booking-app-1.PNG',
      '/projects/service-booking-app-2.PNG',
      '/projects/service-booking-app-3.PNG',
      '/projects/service-booking-app-4.PNG',
      '/projects/service-booking-app-5.PNG',
    ],
    featured: false,
  },
  {
    id: 'property-rental-dashboard',
    name: 'Property Rental Dashboard',
    description:
      'An admin dashboard for managing property listings, tracking availability, and monitoring rental activity at a glance.',
    longDescription:
      'A dashboard-first interface for property managers to add and edit listings, track occupancy, and get a quick overview of rental performance.',
    tags: ['React', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/MunsifKhanafg/property-rental-dashboard',
    live: 'https://munsifkhanafg.github.io/property-rental-dashboard/',
    images: [
      '/projects/property-rental-dashboard-1.PNG',
      '/projects/property-rental-dashboard-2.PNG',
      '/projects/property-rental-dashboard-3.PNG',
    ],
    featured: false,
  },
]

// ── Experience & Education Timeline ────────────────────────────────────
// type: 'education' | 'experience' | 'milestone'
// `image` is optional — a logo for the institution/company. Drop a file into
// /public/logos (e.g. /public/logos/college.png) and reference it here, e.g.
// image: '/logos/college.png'. Leave it '' to keep the default icon badge.
export const timeline = [
  {
    id: 'bscs',
    type: 'education',
    title: 'BS Computer Science',
    org: 'Government Post Graduate College, Landi Kotal (affiliated with University of Peshawar)',
    period: '2023 — 2027',
    description:
      'Currently in 7th semester. Coursework spans software engineering, mobile development, computer organization, and human-computer interaction.',
    image: '',
  },
  {
    id: 'digiskills',
    type: 'education',
    title: 'Frontend, MERN Stack, Mobile App & Game Development',
    org: 'DigiSkills',
    period: 'Online',
    description:
      'Completed structured courses covering frontend development, the full MERN stack, mobile app development, and game development fundamentals.',
    image: '',
  },
  {
    id: 'devbzam',
    type: 'experience',
    title: 'Internship',
    org: 'DEVBZAM',
    period: '',
    description:
      'Hands-on experience applying full-stack development skills in a real team/production setting.',
    image: '',
  },
]

// ── Skills matrix ──────────────────────────────────────────────────────
export const skills = {
  Languages: ['JavaScript', 'HTML5', 'CSS3', 'SQL'],
  'Frameworks & Libraries': ['React', 'Redux Toolkit', 'Node.js', 'Express', 'Tailwind CSS'],
  Databases: ['MongoDB'],
  'Tools & Platforms': ['Git', 'GitHub', 'Socket.io', 'Docker', 'Jenkins', 'Kubernetes', 'CI/CD', 'Vercel'],
}
