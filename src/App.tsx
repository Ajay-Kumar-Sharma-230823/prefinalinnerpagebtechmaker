import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowUpRight, ArrowUp, BookOpen, Check, ChevronRight, CircleX, ClipboardCheck,
  Download, FileText, FolderKanban, GraduationCap, Landmark, Layers3,
  Maximize2, Menu, Minus, Moon, Play, Plus, Rocket, Search, Sparkles, Sun, Users, Video, X,
} from 'lucide-react'
import {
  siAccenture, siAmd, siApple, siAtlassian, siCisco, siCoursera, siDatadog, siDell,
  siDevpost, siGoogle, siHcl, siInfosys, siIntel, siMeta, siNvidia, siQualcomm,
  siRedhat, siSap, siSnowflake, siTcs, siUdemy, siWipro, siYcombinator, siYoutube, siZoho,
} from 'simple-icons'

type Theme = 'dark' | 'light'
type SectionId = 'isro' | 'hackathons' | 'academics' | 'certifications' | 'internships' | 'iit' | 'startups' | 'careers' | 'preparation'
type ResourceType = 'external' | 'document' | 'video' | 'guide' | 'preparation'
type Availability = 'available' | 'awaited'
type Resource = { name: string; description: string; href?: string; label: string; section: SectionId; group?: string; logo?: string; logoUrl?: string; domain?: string; actionLabel?: string; organization?: 'ISRO' | 'DRDO' | 'Government' | 'Preparation'; resourceType?: ResourceType; availability?: Availability; documentUrl?: string; videoUrl?: string; thumbnail?: string; duration?: string; category?: string }
type Company = Resource & { group: 'Big Tech' | 'Indian IT' | 'Semiconductor' | 'Cloud & SaaS' }
type ReferenceImage = { name: string; title: string; src: string; platform?: string }
type Presentation = { name: string; title: string; label: string; fileUrl: string; previewUrl: string; downloadName: string; videoUrl?: string }
type SubjectPaper = { title: string; filename: string; href: string }
type SubjectStudyResource = { code: string; semester: string; year: string; subject: string; description: string; paperUrl: string; paperName: string; syllabusUrl: string; syllabusName: string; archiveUrl: string; archiveName: string; pyqArchiveUrl: string; pyqArchiveName: string; pyqPapers: SubjectPaper[]; studyUrl: string; aiButtonLabel: string }
type AcademicSubject = { id: string; name: string; code?: string; semester?: string; resource?: SubjectStudyResource }
type AcademicYear = { id: string; title: string; subtitle: string; badge: string; subjects: AcademicSubject[] }

const navItems: { id: SectionId; label: string }[] = [
  { id: 'isro', label: 'ISRO' }, { id: 'hackathons', label: 'Hackathons' }, { id: 'academics', label: 'Academics' },
  { id: 'certifications', label: 'Certifications' }, { id: 'internships', label: 'Govt internships' }, { id: 'iit', label: 'IIT summer' },
  { id: 'startups', label: 'Startups' }, { id: 'careers', label: 'MNC wall' }, { id: 'preparation', label: 'Preparation hub' },
]

const isroResources: Resource[] = [
  { name: 'ISRO Course Calendar', description: 'Browse upcoming remote-sensing and space-science courses from IIRS / ISRO.', href: 'https://isrolms.iirs.gov.in/edusatregistration/coursecalender', label: 'Course calendar', section: 'isro', logo: 'ISRO' },
  { name: 'ISRO Registration Portal', description: 'Register for available IIRS online learning programmes and live courses.', href: 'https://isrolms.iirs.gov.in/edusatregistration/', label: 'Registration', section: 'isro', logo: 'ISRO' },
  { name: 'ISRO Learning Management System', description: 'Access the official IIRS learning management system for enrolled courses.', href: 'https://isrolms.iirs.gov.in/login/', label: 'Learning platform', section: 'isro', logo: 'ISRO' },
]

const hackathonResources: Resource[] = [
  { name: 'Unstop', description: 'Competitions, hackathons and curated student challenges across India.', href: 'https://unstop.com/', label: 'National platform', section: 'hackathons', group: 'National', logo: 'U' },
  { name: 'MSME', description: 'Explore MSME innovation challenges, incubation opportunities, government initiatives and entrepreneurship programmes.', href: 'https://my.msme.gov.in/inc/', label: 'National platform', section: 'hackathons', group: 'National', logo: 'MSME', domain: 'my.msme.gov.in' },
  { name: 'Yukti', description: "Discover innovation, ideation, entrepreneurship and technology-based opportunities through the Ministry of Education's innovation platform.", href: 'https://yukti.mic.gov.in/', label: 'National platform', section: 'hackathons', group: 'National', logo: 'YUKTI', domain: 'yukti.mic.gov.in' },
  { name: 'Hack2Skill', description: 'Industry-backed hackathons and innovation programmes for builders.', href: 'https://hack2skill.com/', label: 'National platform', section: 'hackathons', group: 'National', logo: 'H2S' },
  { name: 'HackIndia', description: 'Discover Indian hackathons, innovation sprints and team challenges.', href: 'https://hackindia.org/hackathons', label: 'National platform', section: 'hackathons', group: 'National', logo: 'HI' },
  { name: 'Devpost', description: 'The global home for online hackathons and project submissions.', href: 'https://devpost.com/', label: 'International platform', section: 'hackathons', group: 'International', logo: 'devpost' },
  { name: 'SEVA FIRST', description: 'Explore innovation challenges and opportunities through SEVA FIRST, an initiative supporting student innovation and problem-solving.', href: 'https://sevafirst.mic.gov.in/', label: 'Innovation challenge', section: 'hackathons', group: 'National', logo: 'SEVA', domain: 'sevafirst.mic.gov.in' },
  { name: 'DSCI Hackathon', description: 'Discover cybersecurity hackathons, digital security challenges and innovation opportunities organised by DSCI.', href: 'https://www.dsci.in/', label: 'Cybersecurity hackathon', section: 'hackathons', group: 'National', logo: 'DSCI', domain: 'dsci.in' },
  { name: 'UIDAI Hackathon', description: 'Explore UIDAI innovation challenges, hackathons and opportunities focused on digital identity and technology.', href: 'https://event.data.gov.in/', label: 'Government hackathon', section: 'hackathons', group: 'National', logo: 'UIDAI', domain: 'uidai.gov.in' },
  { name: 'NHAI Road Safety Hackathon', description: 'Explore road safety innovation challenges and technology-driven solutions for safer and smarter Indian roads.', href: 'https://nhai.gov.in/nhai/sites/default/files/mix_file/Rajmaarg_Mar_25.pdf', label: 'National hackathon', section: 'hackathons', group: 'National', logo: 'NHAI', domain: 'nhai.gov.in', actionLabel: 'Explore challenge' },
  { name: 'Innovate India', description: 'Discover national innovation competitions, government challenges, ideas and opportunities through the MyGov Innovate India platform.', href: 'https://innovateindia.mygov.in/', label: 'National innovation platform', section: 'hackathons', group: 'National', logo: 'MYGOV', domain: 'innovateindia.mygov.in' },
  { name: 'MP Innovation Portal', description: 'Explore Madhya Pradesh government innovation initiatives, startup opportunities, technology challenges and innovation programmes.', href: 'https://innovate.mponline.gov.in/', label: 'STATE INNOVATION PLATFORM', section: 'hackathons', group: 'National', logo: 'MP', logoUrl: 'https://innovate.mponline.gov.in/assets/favicon-DDc84rHg.ico', actionLabel: 'Visit Portal' },
]
const sihResource: Resource = { name: 'Smart India Hackathon (SIH)', description: 'A nationwide innovation initiative connecting students with real-world problem statements from government ministries, public departments and industry.', href: 'https://www.sih.gov.in/', label: 'Featured national opportunity', section: 'hackathons', logo: 'SIH' }

const academicResources: Resource[] = [
  { name: 'RGPV Scheme and Syllabus', description: 'Official schemes, subjects and course syllabi for RGPV programmes.', href: 'https://www.rgpv.ac.in/Uni/frm_ViewScheme.aspx', label: 'University resource', section: 'academics', group: 'University', logo: 'RGPV' },
  { name: 'RGPV Previous Year Question Papers', description: 'Previous papers for focused revision and examination practice.', href: 'https://www.rgpvonline.com/', label: 'University resource', section: 'academics', group: 'University', logo: 'RGPV' },
  { name: 'Ashakhil Rani', description: 'Engineering classroom videos to support structured academic study.', href: 'https://youtube.com/@ashakhilrani?si=99epIXbtg2F_0Cvg', label: 'YouTube classroom', section: 'academics', group: 'Video', logo: 'youtube' },
  { name: 'True Engineer', description: 'Clear engineering concepts, exam support and study guidance.', href: 'https://www.youtube.com/@TrueEngineer', label: 'YouTube classroom', section: 'academics', group: 'Video', logo: 'youtube' },
  { name: 'RGPV Official', description: 'Official university videos, announcements and academic updates.', href: 'https://www.youtube.com/@rgpvofficial', label: 'YouTube classroom', section: 'academics', group: 'Video', logo: 'youtube' },
]

function createPyqPapers(collection: string, papers: Array<[string, string]>): SubjectPaper[] { return papers.map(([title, filename]) => ({ title, filename, href: `/academic-resources/${collection}/${encodeURIComponent(filename)}` })) }
const beeePyqPapers = createPyqPapers('BEEE_All_Previous_Year_Question_Papers', [
  ['BE-104 · Dec 2014', 'be-104-basic-electrical-and-electronics-engineering-dec-2014.pdf'], ['BE-104 · Jun 2016', 'be-104-basic-electrical-and-electronics-engineering-jun-2016.pdf'],
  ['BT-1004 · May 2018', 'bt-1004-basic-electrical-and-electronics-engineering-may-2018.pdf'], ['BT-1004 · Nov 2018', 'bt-1004-basic-electrical-and-electronics-engineering-nov-2018.pdf'],
  ['BT-1004 · May 2019', 'bt-1004-basic-electrical-and-electronics-engineering-may-2019.pdf'], ['BT-1004 · Jun 2020', 'bt-1004-basic-electrical-and-electronics-engineering-jun-2020.pdf'],
  ['BT-104 · Nov 2018', 'bt-104-basic-electrical-and-electronics-engineering-nov-2018.pdf'], ['BT-104 · May 2019', 'bt-104-basic-electrical-and-electronics-engineering-may-2019.pdf'],
  ['BT-104 · Nov 2019', 'bt-104-basic-electrical-and-electronics-engineering-nov-2019.pdf'], ['BT-104 · Jun 2020', 'bt-104-basic-electrical-and-electronics-engineering-jun-2020.pdf'],
  ['BT-104 · Nov 2022', 'bt-104-basic-electrical-and-electronics-engineering-nov-2022.pdf'], ['BT-104 · Jun 2022', 'bt-104-basic-electrical-and-electronics-engineering-jun-2022.pdf'],
  ['BT-104 · Jun 2023', 'bt-104-basic-electrical-and-electronics-engineering-jun-2023.pdf'], ['BT-104 · Dec 2023', 'bt-104-basic-electrical-and-electronics-engineering-dec-2023.pdf'],
  ['BT-104 · Jun 2024', 'bt-104-basic-electrical-and-electronics-engineering-jun-2024.pdf'], ['BT-104 · Dec 2024', 'bt-104-basic-electrical-and-electronics-engineering-dec-2024.pdf'],
  ['BT-104 · Jun 2025', 'bt-104-basic-electrical-and-electronics-engineering-jun-2025.pdf'], ['BT-104 · Dec 2025', 'bt-104-basic-electrical-and-electronics-engineering-dec-2025.pdf'],
  ['BT-104 · Jun 2026', 'bt-104-basic-electrical-and-electronics-engineering-jun-2026.pdf'],
])
const tocPyqPapers = createPyqPapers('TOC_All_Previous_Year_Question_Papers', [
  ['TOC · 2024', 'TOC 2024.pdf'], ['CS-SD-501 · Jun 2025', 'cs-sd-501-theory-of-computation-jun-2025.pdf'], ['CS-501 · Dec 2025', 'cs-501-theory-of-computation-dec-2025.pdf'],
  ['Archived TOC paper 01', 'toc1.pdf'], ['Archived TOC paper 02', 'toc2.pdf'], ['Archived TOC paper 03', 'toc3.pdf'], ['Archived TOC paper 04', 'toc4.pdf'], ['Archived TOC paper 05', 'toc5.pdf'], ['Archived TOC paper 06', 'toc6.pdf'], ['Archived TOC paper 07', 'toc7.pdf'], ['Archived TOC paper 08', 'toc8.pdf'], ['Archived TOC paper 09', 'toc9.pdf'], ['Archived TOC paper 10', 'toc10.pdf'], ['Archived TOC paper 11', 'toc11.pdf'],
])
const oopmPyqPapers = createPyqPapers('OOPM_All_Previous_Year_Question_Papers', [
  ['CS-305 · Jun 2009', 'cs-305-object-oriented-programming-methodology-jun-2009.pdf'], ['CS-305 · Nov 2018', 'cs-305-object-oriented-programming-and-methodology-nov-2018.pdf'],
  ['CS-305 · May 2019', 'cs-305-object-oriented-programming-and-methodology-may-2019.pdf'], ['CS-305 · Nov 2019', 'cs-305-object-oriented-programming-and-methodology-nov-2019.pdf'],
  ['CS-CT-CO-305 · Jun 2020', 'cs-ct-co-305-object-oriented-programming-and-methodology-jun-2020.pdf'], ['CS-CT-CO-305 · Dec 2020', 'cs-ct-co-305-object-oriented-programming-and-methodology-dec-2020.pdf'],
  ['CS-CT-CO-305 · Nov 2022', 'cs-ct-co-305-object-oriented-programming-and-methodology-nov-2022.pdf'], ['CS-CT-CO-305 · Jun 2023', 'cs-ct-co-305-object-oriented-programming-and-methodology-jun-2023.pdf'],
  ['CS-305 · Dec 2023', 'cs-305-object-oriented-programming-and-methodology-dec-2023.pdf'], ['CS-305 · Dec 2024', 'cs-305-object-oriented-programming-and-methodology-dec-2024.pdf'],
  ['CS-305 · Dec 2025', 'ad-ai-al-cd-cs-cy-is-sd-305-object-oriented-programming-and-methodology-dec-2025.pdf'],
])
const softwareArchitecturesPyqPapers = createPyqPapers('Software_Architectures_All_Previous_Year_Question_Papers', [
  ['CS-701 · Jun 2025', 'cs-701-software-architectures-jun-2025.pdf'], ['CS-701 · Dec 2025', 'cs-701-software-architectures-dec-2025.pdf'],
  ['Archived Software Architectures paper 01', '1.pdf'], ['Archived Software Architectures paper 02', '2.pdf'], ['Archived Software Architectures paper 03', '3.pdf'], ['Archived Software Architectures paper 04', '4.pdf'],
])

const subjectStudyResources: SubjectStudyResource[] = [
  {
    code: 'BEEE', semester: '1st SEM', year: '1st YEAR RGPV', subject: 'Basic Electrical and Electronics Engineering',
    description: 'Original RGPV previous-year paper and official syllabus, organised for first-semester preparation.',
    paperUrl: '/academic-resources/BEEE_1st_Sem_1st_Year_RGPV/BEEE_Previous_Year_Question_Paper.pdf', paperName: 'BEEE_Previous_Year_Question_Paper.pdf',
    syllabusUrl: '/academic-resources/BEEE_1st_Sem_1st_Year_RGPV/BEEE_Official_Syllabus.pdf', syllabusName: 'BEEE_Official_Syllabus.pdf',
    archiveUrl: '/academic-resources/BEEE_1st_Sem_1st_Year_RGPV.zip', archiveName: 'BEEE_1st_Sem_1st_Year_RGPV.zip', pyqArchiveUrl: '/academic-resources/BEEE_All_Previous_Year_Question_Papers.zip', pyqArchiveName: 'BEEE_All_Previous_Year_Question_Papers.zip', pyqPapers: beeePyqPapers,
    studyUrl: 'https://chatgpt.com/g/g-p-6af32ad15b08819184c8b7118a73fbe7-b-techmaker-rgpv-1st-year-beee-1st-sem/project', aiButtonLabel: 'Open BEEE AI Study Assistant',
  },
  {
    code: 'TOC', semester: '5th SEM', year: '3rd YEAR RGPV', subject: 'Theory of Computation',
    description: 'Original RGPV previous-year paper and official syllabus, ready for fifth-semester study planning.',
    paperUrl: '/academic-resources/TOC_5th_Sem_3rd_Year_RGPV/TOC_Previous_Year_Question_Paper.pdf', paperName: 'TOC_Previous_Year_Question_Paper.pdf',
    syllabusUrl: '/academic-resources/TOC_5th_Sem_3rd_Year_RGPV/TOC_Official_Syllabus.pdf', syllabusName: 'TOC_Official_Syllabus.pdf',
    archiveUrl: '/academic-resources/TOC_5th_Sem_3rd_Year_RGPV.zip', archiveName: 'TOC_5th_Sem_3rd_Year_RGPV.zip', pyqArchiveUrl: '/academic-resources/TOC_All_Previous_Year_Question_Papers.zip', pyqArchiveName: 'TOC_All_Previous_Year_Question_Papers.zip', pyqPapers: tocPyqPapers,
    studyUrl: 'https://chatgpt.com/g/g-p-6af34abcb8908191975c056663080428-b-techmaker-rgpv-3rd-year-toc-5th-sem/project', aiButtonLabel: 'Open TOC AI Study Assistant',
  },
  {
    code: 'OOPM', semester: '3rd SEM', year: '2nd YEAR RGPV', subject: 'Object Oriented Programming & Methodology',
    description: 'Original RGPV OOPM papers and official syllabus for second-year, third-semester preparation.',
    paperUrl: '/academic-resources/OOPM_3rd_Sem_2nd_Year_RGPV/OOPM_Previous_Year_Question_Paper.pdf', paperName: 'OOPM_Previous_Year_Question_Paper.pdf',
    syllabusUrl: '/academic-resources/OOPM_3rd_Sem_2nd_Year_RGPV/OOPM_Official_Syllabus.pdf', syllabusName: 'OOPM_Official_Syllabus.pdf',
    archiveUrl: '/academic-resources/OOPM_3rd_Sem_2nd_Year_RGPV.zip', archiveName: 'OOPM_3rd_Sem_2nd_Year_RGPV.zip', pyqArchiveUrl: '/academic-resources/OOPM_All_Previous_Year_Question_Papers.zip', pyqArchiveName: 'OOPM_All_Previous_Year_Question_Papers.zip', pyqPapers: oopmPyqPapers,
    studyUrl: 'https://chatgpt.com/g/g-p-6af50e209f6c819180accffa5e43d769-b-techmaker-rgpv-2nd-year-oopm-3rd-sem/project', aiButtonLabel: 'Open OOPM AI Study Assistant',
  },
  {
    code: 'SA', semester: '7th SEM', year: '4th YEAR RGPV', subject: 'Software Architectures',
    description: 'Original RGPV Software Architectures papers and official syllabus for fourth-year, seventh-semester preparation.',
    paperUrl: '/academic-resources/Software_Architectures_7th_Sem_4th_Year_RGPV/Software_Architectures_Previous_Year_Question_Paper.pdf', paperName: 'Software_Architectures_Previous_Year_Question_Paper.pdf',
    syllabusUrl: '/academic-resources/Software_Architectures_7th_Sem_4th_Year_RGPV/Software_Architectures_Official_Syllabus.pdf', syllabusName: 'Software_Architectures_Official_Syllabus.pdf',
    archiveUrl: '/academic-resources/Software_Architectures_7th_Sem_4th_Year_RGPV.zip', archiveName: 'Software_Architectures_7th_Sem_4th_Year_RGPV.zip', pyqArchiveUrl: '/academic-resources/Software_Architectures_All_Previous_Year_Question_Papers.zip', pyqArchiveName: 'Software_Architectures_All_Previous_Year_Question_Papers.zip', pyqPapers: softwareArchitecturesPyqPapers,
    studyUrl: 'https://chatgpt.com/g/g-p-6af35f47878c81919a718a4f9afa5044-b-techmaker-rgpv-4th-year-sa-7th-sem/project', aiButtonLabel: 'Open Software Architectures AI Study Assistant',
  },
]

const academicYears: AcademicYear[] = [
  {
    id: 'first-year', title: '1st YEAR', subtitle: 'FIRST YEAR ENGINEERING', badge: 'RGPV',
    subjects: [
      { id: 'beee', name: 'Basic Electrical & Electronics Engineering (BEEE)', code: 'BEEE', semester: '1st SEM', resource: subjectStudyResources[0] },
      { id: 'engineering-chemistry', name: 'Engineering Chemistry' },
      { id: 'mathematics-1', name: 'Mathematics-I' },
      { id: 'english-communication', name: 'English for Communication' },
      { id: 'engineering-graphics', name: 'Engineering Graphics' },
    ],
  },
  {
    id: 'second-year', title: '2nd YEAR', subtitle: 'SECOND YEAR ENGINEERING', badge: 'RGPV',
    subjects: [
      { id: 'oopm', name: 'Object Oriented Programming & Methodology (OOPM)', code: 'OOPM', semester: '3rd SEM', resource: subjectStudyResources[2] },
      { id: 'energy-environmental', name: 'Energy & Environmental Engineering' },
      { id: 'discrete-structure', name: 'Discrete Structure' },
      { id: 'data-structure', name: 'Data Structure' },
      { id: 'digital-systems', name: 'Digital Systems' },
    ],
  },
  {
    id: 'third-year', title: '3rd YEAR', subtitle: 'THIRD YEAR ENGINEERING', badge: 'RGPV',
    subjects: [
      { id: 'toc', name: 'Theory of Computation (TOC)', code: 'TOC', semester: '5th SEM', resource: subjectStudyResources[1] },
      { id: 'dbms', name: 'Database Management Systems (DBMS)' },
      { id: 'data-analytics', name: 'Data Analytics / Pattern Recognition / Cyber Security' },
      { id: 'web-oop-idbms', name: 'Internet and Web Technology / Object Oriented Programming / Introduction to Database Management Systems' },
    ],
  },
  {
    id: 'fourth-year', title: '4th YEAR', subtitle: 'FOURTH YEAR ENGINEERING', badge: 'RGPV',
    subjects: [
      { id: 'software-architectures', name: 'Software Architectures', code: 'SA', semester: '7th SEM', resource: subjectStudyResources[3] },
      { id: 'big-data', name: 'Big Data' },
      { id: 'data-mining-warehousing', name: 'Data Mining and Warehousing' },
    ],
  },
]

const certificationResources: Resource[] = [
  { name: 'Udemy', description: 'Practical, self-paced courses across modern technical fields.', href: 'https://www.udemy.com', label: 'Courses', section: 'certifications', logo: 'udemy' },
  { name: 'UpGrad', description: 'Professional learning programmes and career credentials.', href: 'https://www.upgrad.com/', label: 'Professional learning', section: 'certifications', logo: 'upGrad' },
  { name: 'IBM SkillsBuild', description: 'Free technology and workplace learning from IBM.', href: 'https://skillsbuild.org/', label: 'Free learning', section: 'certifications', logo: 'IBM' },
  { name: 'Infosys Springboard', description: 'Digital learning and skill-development resources from Infosys.', href: 'https://www.infosys.com/about/esg/esg-opportunity/springboard.html', label: 'Free learning', section: 'certifications', logo: 'infosys' },
  { name: 'TCS iON Career Edge', description: 'Employability, communication and professional skills for students.', href: 'https://www.tcsion.com/courses/career-edge-young-professional/', label: 'Career readiness', section: 'certifications', logo: 'TCS' },
  { name: 'Coursera', description: 'University and industry certificates from global partners.', href: 'https://www.coursera.org', label: 'Certificates', section: 'certifications', logo: 'coursera' },
  { name: 'Skill India Digital', description: 'Government-supported free online courses and skilling pathways.', href: 'https://www.skillindiadigital.gov.in/free-online-courses/', label: 'National skill platform', section: 'certifications', logo: 'Skill India' },
  { name: 'SWAYAM NPTEL', description: 'Structured academic courses from India’s premier institutions.', href: 'https://swayam.gov.in/about', label: 'Academic learning', section: 'certifications', logo: 'NPTEL' },
  { name: 'Google Career Certificates', description: 'Job-ready programmes for in-demand digital career paths.', href: 'https://grow.google/certificates', label: 'Career certificate', section: 'certifications', logo: 'google' },
  { name: 'AWS Training', description: 'Cloud foundations and role-based learning from AWS.', href: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', label: 'Cloud learning', section: 'certifications', logo: 'AWS' },
  { name: 'Forage', description: 'Self-paced virtual work experiences with a completion certificate for your portfolio.', href: 'https://www.theforage.com/', label: 'Virtual experience', section: 'certifications', logo: 'Forage' },
  { name: 'IIT Guwahati', description: 'Professional certification programmes and academic learning from IIT Guwahati.', href: 'https://vidya.iitg.ac.in/', label: 'Certification courses', section: 'certifications', logo: 'IITG' },
  { name: 'NVIDIA Deep Learning Institute', description: 'Hands-on AI, accelerated computing and data-science learning with certificate options.', href: 'https://www.nvidia.com/en-us/deep-learning-ai/education.md/', label: 'AI certification', section: 'certifications', logo: 'nvidia' },
  { name: 'Oracle University', description: 'Role-focused Oracle technology learning and professional certification pathways.', href: 'https://education.oracle.com/', label: 'Professional certification', section: 'certifications', logo: 'Oracle' },
]

const internshipResources: Resource[] = [
  { name: 'AICTE Internship Portal', description: 'Official AICTE destination for internship listings and applications.', href: 'https://internship.aicte-india.org/internships/1?uid=SU5URVJOU0hJUF8xNzg0NzEzMTYyNmE2MDhmY2ZiMg%3D%3D&level=MTg%3D', label: 'Government portal', section: 'internships', logo: 'AICTE' },
  { name: 'Indian Army Internship', description: 'Indian Army opportunities through the AICTE internship dashboard.', href: 'https://internship.aicte-india.org/dashboards/indianarmy', label: 'Defence', section: 'internships', logo: 'Army' },
  { name: 'DRDO Internship', description: 'Check official DRDO notices and current internship information.', href: 'https://drdo.gov.in/', label: 'Defence research', section: 'internships', logo: 'DRDO' },
  { name: 'DRDO Single-Time Application Form', description: 'The official form URL has not been supplied yet.', label: 'Link awaited', section: 'internships', logo: 'DRDO' },
  { name: 'ISRO Internship', description: 'Official ISRO internships and student project opportunities.', href: 'https://www.isro.gov.in/InternshipAndProjects.html', label: 'Space research', section: 'internships', logo: 'ISRO' },
  { name: 'Ministry of External Affairs', description: 'Official internship programme from the Ministry of External Affairs.', href: 'https://internship.mea.gov.in/internship', label: 'Government ministry', section: 'internships', logo: 'MEA' },
  { name: 'Prime Minister Internship Scheme', description: 'Official PM Internship Scheme application portal.', href: 'https://pminternship.mca.gov.in/login/', label: 'Government scheme', section: 'internships', logo: 'PM' },
  { name: 'Ministry of Women and Child Development', description: 'Ministry internship offering and programme information.', href: 'https://wcd.gov.in/offerings/internship', label: 'Government ministry', section: 'internships', logo: 'WCD' },
  { name: 'Ministry of Statistics and Programme Implementation', description: 'Internship portal for statistics and programme implementation.', href: 'https://internship.mospi.gov.in/', label: 'Government ministry', section: 'internships', logo: 'MoSPI' },
  { name: 'Legislative Department – Ministry of Law & Justice', description: 'Official internship and fellowship information from the Legislative Department.', href: 'https://www.legislative.gov.in/offerings/schemes-and-services/details/internship-fellowships-ITM4AjMtQWa', label: 'Government ministry', section: 'internships', logo: 'Law' },
  { name: 'Ministry of Electronics and Information Technology', description: 'MeitY official internship portal for technology students.', href: 'https://intern.meity.gov.in/login', label: 'Technology ministry', section: 'internships', logo: 'MeitY' },
  { name: 'India Science, Technology and Innovation Portal', description: 'Official listing page for science, technology and innovation internships.', href: 'https://www.indiascienceandtechnology.gov.in/listingpage/internships', label: 'Science portal', section: 'internships', logo: 'India STI' },
  { name: 'Ministry of Environment, Forest and Climate Change', description: 'Official MoEFCC internship portal and programme details.', href: 'https://portals.moef.gov.in/internship/', label: 'Government ministry', section: 'internships', logo: 'MoEFCC' },
  { name: 'National Human Rights Commission', description: 'NHRC training and internship programme information.', href: 'https://nhrc.nic.in/training-programmes/internship-programmes', label: 'National institution', section: 'internships', logo: 'NHRC' },
  { name: 'NITI Aayog Internship', description: 'Official NITI Aayog internship portal for policy and research exposure.', href: 'https://workforindia.niti.gov.in/intern/InternshipEntry/homepage.aspx', label: 'Policy internship', section: 'internships', logo: 'NITI' },
]

const iitResources: Resource[] = [
  { name: 'IIT Kharagpur', description: 'Official Kriti internship and research opportunities portal.', href: 'https://kriti.iitkgp.ac.in/', label: 'Kriti programme', section: 'iit', logo: 'IIT KGP' }, { name: 'IIT Bombay', description: 'Official IIT Bombay internship programme information.', href: 'https://www.ircc.iitb.ac.in/IRCC-Webpage/IITBInternship/', label: 'IITB internship', section: 'iit', logo: 'IITB' },
  { name: 'IIT Madras', description: 'Summer Student Program (SSP).', href: 'https://ssp.iitm.ac.in/summer-fellowship-registration', label: 'Summer Student Program', section: 'iit', logo: 'IITM' }, { name: 'IIT Kanpur', description: 'Official SURGE undergraduate research programme.', href: 'https://surge.iitk.ac.in/#main-content', label: 'SURGE programme', section: 'iit', logo: 'IITK' },
  { name: 'IIT Delhi', description: 'Official IIT Delhi summer internship announcement.', href: 'https://home.iitd.ac.in/show.php?id=837&in_sections=News', label: 'Official announcement', section: 'iit', logo: 'IITD' }, { name: 'IIT Guwahati', description: 'Summer Internship Programme (SIP) 2026 information.', href: 'https://iitg.ac.in/maths/index_page_details.php?page=5e8e29db97249e063eca106ccf5f323ce5865d8b&name=SIP-2026', label: 'SIP 2026', section: 'iit', logo: 'IITG' },
  { name: 'IIT Roorkee', description: 'SPARK Summer Internship.', href: 'https://spark.iitr.ac.in/', label: 'SPARK programme', section: 'iit', logo: 'IITR' }, { name: 'IIT BHU Varanasi', description: 'Official JCSIC internship updates.', href: 'https://iitbhu.ac.in/cf/jcsic/updates', label: 'JCSIC updates', section: 'iit', logo: 'IIT BHU' },
  { name: 'IIT Bhubaneswar', description: 'Official internship application portal.', href: 'https://webapps.iitbbs.ac.in/internship-application/index.php', label: 'Application portal', section: 'iit', logo: 'IIT BBS' }, { name: 'IIT Gandhinagar', description: 'SRIP 2026.', href: 'https://srip.iitgn.ac.in/info/srip-2026/', label: 'SRIP 2026', section: 'iit', logo: 'IITGN' },
  { name: 'IIT Hyderabad', description: 'Summer Undergraduate Research Exposure programme.', href: 'https://www.iith.ac.in/news/2026/02/27/Summer-Undergraduate-Research-Exposure/', label: 'SURE programme', section: 'iit', logo: 'IITH' }, { name: 'IIT Jodhpur', description: 'SURAJ Summer Research Program.', href: 'https://www.iitj.ac.in/suraj/en/suraj', label: 'SURAJ programme', section: 'iit', logo: 'IITJ' },
  { name: 'IIT Patna', description: 'Official IIT Patna internship notice.', href: 'https://www.iitp.ac.in/notices/27', label: 'Official notice', section: 'iit', logo: 'IITP' }, { name: 'IIT Ropar', description: 'Official internship admissions information.', href: 'https://www.iitrpr.ac.in/internship-admissions', label: 'Internship admissions', section: 'iit', logo: 'IIT RPR' },
  { name: 'IIT Indore', description: 'Official IIT Indore internship information.', href: 'https://www.iiti.ac.in/academics/internship', label: 'Internship programme', section: 'iit', logo: 'IITI' }, { name: 'IIT Mandi', description: 'Official internship information and opportunities.', href: 'https://academics.iitmandi.ac.in/internships', label: 'Official website', section: 'iit', logo: 'IIT MND' },
  { name: 'IIT (ISM) Dhanbad', description: 'Summer Research Internship Program (SRIP).', href: 'https://people.iitism.ac.in/~research/SRIP.php', label: 'SRIP programme', section: 'iit', logo: 'IIT ISM' }, { name: 'IIT Palakkad', description: 'Official summer internship opportunities.', href: 'https://iitpkd.ac.in/notifications/summer-internship-opportunities-iit-palakkad', label: 'Summer internship', section: 'iit', logo: 'IIT PKD' },
  { name: 'IIT Tirupati', description: 'Official Interns and Apprentice information.', href: 'https://www.iittp.ac.in/Interns_and_Apprentice', label: 'Official website', section: 'iit', logo: 'IITTP' }, { name: 'IIT Bhilai', description: 'Official internship procedure and guidance.', href: 'https://www.iitbhilai.ac.in/index.php?pid=internship_procedure', label: 'Official procedure', section: 'iit', logo: 'IITBH' },
  { name: 'IIT Goa', description: 'Summer Internships 2025 information.', href: 'https://iitgoa.ac.in/summer-internships-2025-iit-goa/', label: 'Official website', section: 'iit', logo: 'IIT GOA' }, { name: 'IIT Jammu', description: 'RISE-UP research and innovation programme.', href: 'https://iitjammu.ac.in/post/rise-up', label: 'RISE-UP', section: 'iit', logo: 'IITJM' },
  { name: 'IIT Dharwad', description: 'Official academic internship information.', href: 'https://www.iitdh.ac.in/academic-internship', label: 'Academic internship', section: 'iit', logo: 'IITDH' },
]

const startupResource: Resource = { name: 'Y Combinator', description: 'A distinctive launchpad for entrepreneurship: explore Startup School, founder learning, funding pathways and the global YC network.', href: 'https://www.ycombinator.com/', label: 'Founder ecosystem', section: 'startups', logo: 'yc' }

const iitDomains: Record<string, string> = {
  'IIT Kharagpur': 'iitkgp.ac.in', 'IIT Bombay': 'iitb.ac.in', 'IIT Madras': 'iitm.ac.in', 'IIT Kanpur': 'iitk.ac.in',
  'IIT Delhi': 'iitd.ac.in', 'IIT Guwahati': 'iitg.ac.in', 'IIT Roorkee': 'iitr.ac.in', 'IIT BHU Varanasi': 'iitbhu.ac.in',
  'IIT Bhubaneswar': 'iitbbs.ac.in', 'IIT Gandhinagar': 'iitgn.ac.in', 'IIT Hyderabad': 'iith.ac.in', 'IIT Jodhpur': 'iitj.ac.in',
  'IIT Patna': 'iitp.ac.in', 'IIT Ropar': 'iitrpr.ac.in', 'IIT Indore': 'iiti.ac.in', 'IIT Mandi': 'iitmandi.ac.in',
  'IIT (ISM) Dhanbad': 'iitism.ac.in', 'IIT Palakkad': 'iitpkd.ac.in', 'IIT Tirupati': 'iittp.ac.in', 'IIT Bhilai': 'iitbhilai.ac.in',
  'IIT Goa': 'iitgoa.ac.in', 'IIT Jammu': 'iitjammu.ac.in', 'IIT Dharwad': 'iitdh.ac.in',
}

const companyLogoSlugs: Record<string, string> = {
  Google: 'google', Microsoft: 'microsoft', Amazon: 'amazon', Apple: 'apple', Meta: 'meta', Adobe: 'adobe', TCS: 'tcs',
  Infosys: 'infosys', Accenture: 'accenture', Cognizant: 'cognizant', Wipro: 'wipro', HCLTech: 'hcltech', Capgemini: 'capgemini',
  LTIMindtree: 'ltimindtree', 'Tech Mahindra': 'techmahindra', NVIDIA: 'nvidia', Intel: 'intel', AMD: 'amd', Qualcomm: 'qualcomm',
  Cisco: 'cisco', Oracle: 'oracle', Salesforce: 'salesforce', ServiceNow: 'servicenow', SAP: 'sap', IBM: 'ibm', Workday: 'workday',
  'Red Hat': 'redhat', 'Dell Technologies': 'dell', Atlassian: 'atlassian', Zoho: 'zoho', Snowflake: 'snowflake', Datadog: 'datadog', BrowserStack: 'browserstack',
}

const companies: Company[] = [
  ['Google', 'https://careers.google.com/', 'Big Tech', 'google'], ['Microsoft', 'https://careers.microsoft.com/', 'Big Tech', 'Microsoft'], ['Amazon', 'https://amazon.jobs/', 'Big Tech', 'Amazon'], ['Apple', 'https://jobs.apple.com/', 'Big Tech', 'apple'], ['Meta', 'https://metacareers.com/', 'Big Tech', 'meta'], ['Adobe', 'https://careers.adobe.com/', 'Big Tech', 'Adobe'],
  ['TCS', 'https://www.tcs.com/careers', 'Indian IT', 'tcs'], ['Infosys', 'https://infosys.com/careers', 'Indian IT', 'infosys'], ['Accenture', 'https://accenture.com/careers', 'Indian IT', 'accenture'], ['Cognizant', 'https://careers.cognizant.com/', 'Indian IT', 'Cognizant'], ['Wipro', 'https://careers.wipro.com/', 'Indian IT', 'wipro'], ['HCLTech', 'https://hcltech.com/careers', 'Indian IT', 'hcl'], ['Capgemini', 'https://capgemini.com/careers', 'Indian IT', 'Capgemini'], ['LTIMindtree', 'https://ltimindtree.com/careers', 'Indian IT', 'LT'], ['Tech Mahindra', 'https://careers.techmahindra.com/', 'Indian IT', 'TechM'],
  ['NVIDIA', 'https://nvidia.com/careers', 'Semiconductor', 'nvidia'], ['Intel', 'https://jobs.intel.com/', 'Semiconductor', 'intel'], ['AMD', 'https://careers.amd.com/', 'Semiconductor', 'amd'], ['Qualcomm', 'https://careers.qualcomm.com/', 'Semiconductor', 'qualcomm'], ['Cisco', 'https://jobs.cisco.com/', 'Semiconductor', 'cisco'],
  ['Oracle', 'https://careers.oracle.com/', 'Cloud & SaaS', 'Oracle'], ['Salesforce', 'https://careers.salesforce.com/', 'Cloud & SaaS', 'Salesforce'], ['ServiceNow', 'https://careers.servicenow.com/', 'Cloud & SaaS', 'ServiceNow'], ['SAP', 'https://jobs.sap.com/', 'Cloud & SaaS', 'sap'], ['IBM', 'https://ibm.com/careers', 'Cloud & SaaS', 'IBM'], ['Workday', 'https://workday.com/careers', 'Cloud & SaaS', 'Workday'], ['Red Hat', 'https://redhat.com/jobs', 'Cloud & SaaS', 'redhat'], ['Dell Technologies', 'https://jobs.dell.com/', 'Cloud & SaaS', 'dell'], ['Atlassian', 'https://atlassian.com/careers', 'Cloud & SaaS', 'atlassian'], ['Zoho', 'https://zoho.com/careers', 'Cloud & SaaS', 'zoho'], ['Snowflake', 'https://careers.snowflake.com/', 'Cloud & SaaS', 'snowflake'], ['Datadog', 'https://careers.datadoghq.com/', 'Cloud & SaaS', 'datadog'], ['BrowserStack', 'https://browserstack.com/career', 'Cloud & SaaS', 'BrowserStack'],
].map(([name, href, group, logo]) => ({ name, href, group: group as Company['group'], logo, description: 'Official careers portal for graduate, engineering and professional roles.', label: 'Careers', section: 'careers' }))

// Preparation resources deliberately keep URLs optional: add documentUrl, videoUrl or thumbnail
// here when official files and tutorials are supplied, without changing the UI components.
const applicationDocumentResources: Resource[] = [
  { name: 'ISRO Resume / CV Template', description: 'A configurable space for an ISRO-focused resume or CV template for research and internship applications.', label: 'ISRO application document', section: 'preparation', logo: 'ISRO', organization: 'ISRO', resourceType: 'document', availability: 'awaited', category: 'ISRO application documents' },
  { name: 'ISRO Letter of Recommendation (LOR) Format', description: 'A configurable reference format for faculty recommendations supporting ISRO applications.', label: 'ISRO application document', section: 'preparation', logo: 'ISRO', organization: 'ISRO', resourceType: 'document', availability: 'awaited', category: 'ISRO application documents' },
  { name: 'ISRO Application Documentation Guide', description: 'A future checklist for collecting and presenting required ISRO internship documents.', label: 'ISRO application document', section: 'preparation', logo: 'ISRO', organization: 'ISRO', resourceType: 'guide', availability: 'awaited', category: 'ISRO application documents' },
  { name: 'DRDO Resume / CV Template', description: 'A configurable space for a DRDO-focused resume or CV template for technical applications.', label: 'DRDO application document', section: 'preparation', logo: 'DRDO', organization: 'DRDO', resourceType: 'document', availability: 'awaited', category: 'DRDO application documents' },
  { name: 'DRDO Letter of Recommendation (LOR) Format', description: 'A configurable reference format for faculty recommendations supporting DRDO applications.', label: 'DRDO application document', section: 'preparation', logo: 'DRDO', organization: 'DRDO', resourceType: 'document', availability: 'awaited', category: 'DRDO application documents' },
  { name: 'DRDO Application Documentation Guide', description: 'A future checklist for collecting and presenting required DRDO internship documents.', label: 'DRDO application document', section: 'preparation', logo: 'DRDO', organization: 'DRDO', resourceType: 'guide', availability: 'awaited', category: 'DRDO application documents' },
]

const examFeatureResource: Resource = { name: 'How to Prepare One Day Before an Exam?', description: 'One focused preparation video covering revision strategy, topic prioritisation, time management and an exam-day checklist.', label: 'Unified preparation video', section: 'academics', logo: '24H', organization: 'Preparation', resourceType: 'video', availability: 'awaited', category: 'One-day-before-exam preparation' }

// Add a YouTube URL to videoUrl when the final walkthrough is ready; VideoPreview
// automatically converts it to an embedded player without changing this layout.
const applicationGuideFeatureResource: Resource = { name: 'Internship Application Walkthrough', description: 'One guided video covering the ISRO, DRDO and Government internship application processes from preparation to submission.', label: 'Unified application tutorial', section: 'preparation', logo: 'FORM', organization: 'Government', resourceType: 'video', availability: 'awaited', category: 'Application form guides' }

const referenceImages = {
  isroCertificate: { name: 'ISRO Certificate', title: 'ISRO Certificate – Reference', src: new URL('../Images/ISRO Certificate.jpeg', import.meta.url).href },
  isroCertificate2: { name: 'ISRO Certificate 2', title: 'ISRO Certificate 2 – Reference', src: new URL('../Images/ISRO CERTIFCATE 2.png', import.meta.url).href },
  isroHsfOfferLetter: { name: 'ISRO 1', title: 'ISRO – HSFC – Bengaluru Headquarters', src: new URL('../Images/ISRO 1.jpeg', import.meta.url).href },
  isroVsscOfferLetter: { name: 'ISRO 2', title: 'ISRO – VSSC – Thiruvananthapuram', src: new URL('../Images/ISRO 2.jpeg', import.meta.url).href },
  lor1: { name: 'LOR 1', title: 'LOR 1 – Reference', src: new URL('../Images/LOR 1.jpeg', import.meta.url).href },
  lor2: { name: 'LOR 2', title: 'LOR 2 – Reference', src: new URL('../Images/LOR 2.jpeg', import.meta.url).href },
  finalMarksheet: { name: 'Final Marksheet', title: 'Final Marksheet – Reference', src: new URL('../Images/Final Marksheet.jpeg', import.meta.url).href },
  backMarksheet: { name: 'Back Marksheet', title: 'Back Marksheet – Reference', src: new URL('../Images/Back Marksheet.jpeg', import.meta.url).href },
  seventhSemester: { name: '7th Sem', title: '7th Sem – Reference', src: new URL('../Images/7th Sem.jpeg', import.meta.url).href },
  rgpvExamWriting: { name: 'RGPV Exam Answer-Writing Sample', title: 'How to Write in an RGPV Exam – Sample', src: new URL('../How to Write In  exam/Exam.png', import.meta.url).href },
  resume1: { name: 'Resume 1', title: 'Resume 1 – Reference', src: new URL('../Images/Resume 1.jpeg', import.meta.url).href },
  resume2: { name: 'Resume 2', title: 'Resume 2 – Reference', src: new URL('../Images/Resume 2.jpeg', import.meta.url).href },
} satisfies Record<string, ReferenceImage>

const sihCertificates: ReferenceImage[] = [
  { name: 'SIH 2024 Certificate', title: 'Smart India Hackathon 2024 – Certificate', src: new URL('../SIH/SIH24.jpeg', import.meta.url).href },
  { name: 'SIH 2025 Certificate', title: 'Smart India Hackathon 2025 – Certificate', src: new URL('../SIH/SIH25.jpeg', import.meta.url).href },
]
const sihSelectedPresentations: Presentation[] = [
  { name: 'SIH 2024 selected project presentation', title: 'SIH 2024 — Selected Project PPT', label: 'SIH 2024 · Selected', fileUrl: new URL('../SIH/Selected SIH 24.pdf', import.meta.url).href, previewUrl: new URL('./assets/sih-previews/selected-sih-2024-1.png', import.meta.url).href, downloadName: 'Selected SIH 24.pdf' },
  { name: 'SIH 2025 selected project presentation', title: 'SIH 2025 — Selected Project PPT', label: 'SIH 2025 · Selected', fileUrl: new URL('../SIH/Selected SIH 25.pdf', import.meta.url).href, previewUrl: new URL('./assets/sih-previews/selected-sih-2025-1.png', import.meta.url).href, downloadName: 'Selected SIH 25.pdf', videoUrl: 'https://youtu.be/W9DRAt3mJeY?feature=shared' },
]
const sihSubmittedPresentations: Presentation[] = [
  { name: 'Amrit Sparsh EHR presentation', title: 'Amrit Sparsh – EHR', label: 'SIH 2025 · Submitted', fileUrl: new URL('../SIH/Amrit Sparsh - EHR.pdf', import.meta.url).href, previewUrl: new URL('./assets/sih-previews/amrit-sparsh-ehr-1.png', import.meta.url).href, downloadName: 'Amrit Sparsh - EHR.pdf', videoUrl: 'https://youtu.be/XiAdJNxOvtM?feature=shared' },
  { name: 'Nigam Setu Transformer presentation', title: 'Nigam Setu Transformer', label: 'SIH 2025 · Submitted', fileUrl: new URL('../SIH/Nigam Setu Transformer.pdf', import.meta.url).href, previewUrl: new URL('./assets/sih-previews/nigam-setu-transformer-1.png', import.meta.url).href, downloadName: 'Nigam Setu Transformer.pdf', videoUrl: 'https://youtu.be/0oE2jAvIBn0?feature=shared' },
  { name: 'Nigam Setu PG presentation', title: 'Nigam Setu PG', label: 'SIH 2025 · Submitted', fileUrl: new URL('../SIH/Nigam Setu PG.pdf', import.meta.url).href, previewUrl: new URL('./assets/sih-previews/nigam-setu-pg-1.png', import.meta.url).href, downloadName: 'Nigam Setu PG.pdf' },
]
const professionalCertificationImages: ReferenceImage[] = [
  { platform: 'Udemy', name: 'Udemy Certificate', title: 'Udemy – Certificate', src: new URL('../Professional certifications & skill development/Udemy.jpeg', import.meta.url).href },
  { platform: 'UpGrad', name: 'UpGrad Certificate', title: 'UpGrad – Certificate', src: new URL('../Professional certifications & skill development/Upgrad.png', import.meta.url).href },
  { platform: 'IBM SkillsBuild', name: 'IBM Certificate', title: 'IBM – Certificate', src: new URL('../Professional certifications & skill development/IBM.png', import.meta.url).href },
  { platform: 'Infosys Springboard', name: 'Infosys Certificate', title: 'Infosys – Certificate', src: new URL('../Professional certifications & skill development/Infosys.png', import.meta.url).href },
  { platform: 'TCS iON Career Edge', name: 'TCS Certificate', title: 'TCS – Certificate', src: new URL('../Professional certifications & skill development/TCS.png', import.meta.url).href },
  { platform: 'Coursera', name: 'Coursera Certificate', title: 'Coursera – Certificate', src: new URL('../Professional certifications & skill development/Coursera.png', import.meta.url).href },
  { platform: 'Skill India Digital', name: 'Skill India Certificate', title: 'Skill India – Certificate', src: new URL('../Professional certifications & skill development/Skill India.png', import.meta.url).href },
  { platform: 'SWAYAM NPTEL', name: 'NPTEL Certificate', title: 'NPTEL – Certificate', src: new URL('../Professional certifications & skill development/Nptel.png', import.meta.url).href },
  { platform: 'Google Career Certificates', name: 'Google Certificate', title: 'Google – Certificate', src: new URL('../Professional certifications & skill development/Google.png', import.meta.url).href },
  { platform: 'AWS Training', name: 'AWS Certificate', title: 'AWS – Certificate', src: new URL('../Professional certifications & skill development/AWS.png', import.meta.url).href },
  { platform: 'Forage', name: 'Forage Certificate', title: 'Forage – Certificate', src: new URL('../Professional certifications & skill development/Foarge.png', import.meta.url).href },
  { platform: 'IIT Guwahati', name: 'IIT Guwahati Certificate', title: 'IIT Guwahati – Certificate', src: new URL('../Professional certifications & skill development/IIT G.png', import.meta.url).href },
  { platform: 'NVIDIA Deep Learning Institute', name: 'NVIDIA Certificate', title: 'NVIDIA – Certificate', src: new URL('../Professional certifications & skill development/Nivida.png', import.meta.url).href },
  { platform: 'Oracle University', name: 'Oracle Certificate', title: 'Oracle – Certificate', src: new URL('../Professional certifications & skill development/Oracle.png', import.meta.url).href },
]
const professionalCertificatesByPlatform = new Map(professionalCertificationImages.map(image => [image.platform, image]))

const vectorLogos = { google: siGoogle, apple: siApple, meta: siMeta, nvidia: siNvidia, infosys: siInfosys, accenture: siAccenture, wipro: siWipro, hcl: siHcl, sap: siSap, redhat: siRedhat, intel: siIntel, amd: siAmd, qualcomm: siQualcomm, cisco: siCisco, dell: siDell, atlassian: siAtlassian, zoho: siZoho, snowflake: siSnowflake, datadog: siDatadog, udemy: siUdemy, coursera: siCoursera, yc: siYcombinator, devpost: siDevpost, youtube: siYoutube, tcs: siTcs } as const
const logoAliases: Record<string, keyof typeof vectorLogos> = { 'Y Combinator': 'yc', Devpost: 'devpost', Udemy: 'udemy', Coursera: 'coursera', 'Google Career Certificates': 'google', Apple: 'apple', Meta: 'meta', NVIDIA: 'nvidia', Infosys: 'infosys', Accenture: 'accenture', Wipro: 'wipro', HCLTech: 'hcl', SAP: 'sap', 'Red Hat': 'redhat', Intel: 'intel', AMD: 'amd', Qualcomm: 'qualcomm', Cisco: 'cisco', 'Dell Technologies': 'dell', Atlassian: 'atlassian', Zoho: 'zoho', Snowflake: 'snowflake', Datadog: 'datadog', TCS: 'tcs' }

// These files are intentionally imported from the supplied Logos directory so Vite
// fingerprints and deploys them with the site instead of relying on third-party favicon/CDN URLs.
const localLogoSources: Record<string, string> = {
  Adobe: new URL('../Logos/Adobe.png', import.meta.url).href,
  'AICTE Internship Portal': new URL('../Logos/AICTE.jpg', import.meta.url).href,
  Amazon: new URL('../Logos/Amazon.png', import.meta.url).href,
  AWS: new URL('../Logos/AWS.png', import.meta.url).href,
  'AWS Training': new URL('../Logos/AWS.png', import.meta.url).href,
  BrowserStack: new URL('../Logos/Browser stck.png', import.meta.url).href,
  Capgemini: new URL('../Logos/Capgemini.png', import.meta.url).href,
  Cognizant: new URL('../Logos/Cognizzant.png', import.meta.url).href,
  DRDO: new URL('../Logos/DRDO.png', import.meta.url).href,
  'DRDO Internship': new URL('../Logos/DRDO.png', import.meta.url).href,
  'DRDO Single-Time Application Form': new URL('../Logos/DRDO.png', import.meta.url).href,
  Forage: new URL('../Logos/Forage.png', import.meta.url).href,
  HCLTech: new URL('../Logos/HclTech.jpg', import.meta.url).href,
  IBM: new URL('../Logos/IBM.png', import.meta.url).href,
  'IBM SkillsBuild': new URL('../Logos/IBM.png', import.meta.url).href,
  'IIT (ISM) Dhanbad': new URL('../Logos/IIT (ISM) Dhanbad.png', import.meta.url).href,
  'IIT Bhilai': new URL('../Logos/IIT Bhilai.png', import.meta.url).href,
  'IIT Bhubaneswar': new URL('../Logos/IIT Bhubaneswar.png', import.meta.url).href,
  'IIT Bombay': new URL('../Logos/IIT Bombay.png', import.meta.url).href,
  'IIT Delhi': new URL('../Logos/IIT Delhi.png', import.meta.url).href,
  'IIT Jammu': new URL('../Logos/IIT Jammu.png', import.meta.url).href,
  'IIT Kanpur': new URL('../Logos/IIT Kanpur.png', import.meta.url).href,
  'IIT Madras': new URL('../Logos/IIT Madras.png', import.meta.url).href,
  'IIT Mandi': new URL('../Logos/IIT Mandi.png', import.meta.url).href,
  'IIT Palakkad': new URL('../Logos/IIT Palakkad.png', import.meta.url).href,
  'IIT Patna': new URL('../Logos/IIT Patna.png', import.meta.url).href,
  'IIT Roorkee': new URL('../Logos/IIT Roorkee.png', import.meta.url).href,
  'IIT Ropar': new URL('../Logos/IIT Ropar.png', import.meta.url).href,
  'IIT Tirupati': new URL('../Logos/IIT Tirupati.png', import.meta.url).href,
  'India Science, Technology and Innovation Portal': new URL('../Logos/India Science, Technology and Innovation Portal.png', import.meta.url).href,
  'Government of India': new URL('../Logos/Prime Minister Internship Scheme.png', import.meta.url).href,
  'Indian Army': new URL('../Logos/Indian Amry.png', import.meta.url).href,
  'Indian Army Internship': new URL('../Logos/Indian Amry.png', import.meta.url).href,
  ISRO: new URL('../Logos/ISRO.png', import.meta.url).href,
  'ISRO Course Calendar': new URL('../Logos/ISRO.png', import.meta.url).href,
  'ISRO Registration Portal': new URL('../Logos/ISRO.png', import.meta.url).href,
  'ISRO Learning Management System': new URL('../Logos/ISRO.png', import.meta.url).href,
  'ISRO Internship': new URL('../Logos/ISRO.png', import.meta.url).href,
  'Legislative Department – Ministry of Law & Justice': new URL('../Logos/Legislative Department – Ministry of Law & Justice.jpg', import.meta.url).href,
  LTIMindtree: new URL('../Logos/lti mindtree.png', import.meta.url).href,
  Microsoft: new URL('../Logos/Microsoft.png', import.meta.url).href,
  'Ministry of Electronics and Information Technology': new URL('../Logos/Ministry of Electronics and Information Technology.png', import.meta.url).href,
  'Ministry of Environment, Forest and Climate Change': new URL('../Logos/Ministry of Environment, Forest and Climate Change.jpg', import.meta.url).href,
  'Ministry of External Affairs': new URL('../Logos/Ministry of External Affairs.png', import.meta.url).href,
  'Ministry of Statistics and Programme Implementation': new URL('../Logos/Ministry of Statistics and Programme Implementation.jpg', import.meta.url).href,
  'Ministry of Women and Child Development': new URL('../Logos/Ministry of Women and Child Development.png', import.meta.url).href,
  MSME: new URL('../Logos/MSME.png', import.meta.url).href,
  'National Human Rights Commission': new URL('../Logos/National Human Rights Commission.jpg', import.meta.url).href,
  'NITI Aayog Internship': new URL('../Logos/NITI Aayog.jpg', import.meta.url).href,
  Oracle: new URL('../Logos/Oracle.png', import.meta.url).href,
  'Oracle University': new URL('../Logos/Oracle.png', import.meta.url).href,
  'Prime Minister Internship Scheme': new URL('../Logos/Prime Minister Internship Scheme.png', import.meta.url).href,
  RGPV: new URL('../Logos/RGPV.png', import.meta.url).href,
  Salesforce: new URL('../Logos/salesforce.png', import.meta.url).href,
  ServiceNow: new URL('../Logos/ServiceNow.png', import.meta.url).href,
  'Smart India Hackathon': new URL('../Logos/SIH.png', import.meta.url).href,
  'Skill India Digital': new URL('../Logos/Skill India.png', import.meta.url).href,
  'SWAYAM NPTEL': new URL('../Logos/Swayam NPTEL.png', import.meta.url).href,
  'Tech Mahindra': new URL('../Logos/tech mahindra.png', import.meta.url).href,
  'UIDAI Hackathon': new URL('../Logos/UIDAI.png', import.meta.url).href,
  Unstop: new URL('../Logos/Unstop.png', import.meta.url).href,
  UpGrad: new URL('../Logos/UpGrad.png', import.meta.url).href,
  Workday: new URL('../Logos/Workday.png', import.meta.url).href,
  Yukti: new URL('../Logos/Yukti.png', import.meta.url).href,
}
type InstitutionalLogo = Pick<Resource, 'name' | 'logo' | 'logoUrl' | 'domain'> & { label: string }

const institutionalDocumentLogos = {
  top: [
    { name: 'Amazon', logo: 'Amazon', label: 'Amazon' },
    { name: 'Meta', logo: 'meta', label: 'Meta' },
    { name: 'Microsoft', logo: 'Microsoft', label: 'Microsoft' },
    { name: 'Google', logo: 'google', label: 'Google' },
  ],
  left: [
    { name: 'ISRO', logo: 'ISRO', label: 'ISRO' },
    { name: 'DRDO', logo: 'DRDO', label: 'DRDO' },
    { name: 'Government of India', logo: 'GOI', label: 'Government of India' },
    { name: 'Indian Army', logo: 'Army', label: 'Indian Army' },
  ],
  right: [
    { name: 'IIT Indore', logo: 'IITI', domain: 'iiti.ac.in', label: 'IIT Indore' },
    { name: 'IIT Delhi', logo: 'IITD', label: 'IIT Delhi' },
    { name: 'IIT Bombay', logo: 'IITB', label: 'IIT Bombay' },
    { name: 'IIT Kanpur', logo: 'IITK', label: 'IIT Kanpur' },
  ],
  bottom: [
    { name: 'TCS', logo: 'tcs', label: 'TCS' },
    { name: 'Infosys', logo: 'infosys', label: 'Infosys' },
    { name: 'Capgemini', logo: 'Capgemini', label: 'Capgemini' },
    { name: 'Deloitte', logo: 'Deloitte', logoUrl: 'https://cdn.simpleicons.org/deloitte/86BC25', label: 'Deloitte' },
  ],
} as const satisfies Record<'top' | 'left' | 'right' | 'bottom', readonly InstitutionalLogo[]>
const heroSlides = [
  { id: 'academics', title: 'Discover Opportunities.', copy: 'Find research internships, IIT summer programs, ISRO learning resources and government opportunities.', tag: 'Research discovery', markers: ['IIT SUMMER', 'ISRO LEARNING', 'INTERNSHIPS'] },
  { id: 'innovation', title: 'Turn Ideas Into Impact.', copy: 'Explore national hackathons, international competitions and innovation challenges.', tag: 'Innovation & building', markers: ['SMART INDIA HACKATHON', 'NATIONAL BUILDS', 'GLOBAL COMPETITIONS'] },
  { id: 'research', title: 'Build Your Future.', copy: 'Access professional certifications, industry learning and global engineering career opportunities.', tag: 'Career & growth', markers: ['33+ COMPANIES', 'CERTIFICATIONS', 'CAREER PATHWAYS'] },
] as const

const subjectStudySearchResources: Resource[] = subjectStudyResources.map(resource => ({ name: `${resource.code} · ${resource.subject}`, description: resource.description, href: resource.archiveUrl, label: `${resource.semester} · ${resource.year}`, section: 'academics', logo: resource.code }))
const allResources = [...isroResources, sihResource, ...hackathonResources, ...academicResources, ...subjectStudySearchResources, ...certificationResources, ...internshipResources, ...iitResources, startupResource, ...companies, ...applicationDocumentResources, applicationGuideFeatureResource, examFeatureResource]

function LogoMark({ resource, compact = false, large = false }: { resource: Pick<Resource, 'name' | 'logo' | 'logoUrl' | 'domain'>; compact?: boolean; large?: boolean }) {
  const [failed, setFailed] = useState(false)
  const key = (resource.logo && resource.logo.toLowerCase()) || logoAliases[resource.name] || resource.name.toLowerCase()
  const vector = vectorLogos[key as keyof typeof vectorLogos] || vectorLogos[logoAliases[resource.name] as keyof typeof vectorLogos]
  const letters = (resource.logo || resource.name).replace(/[^A-Za-z0-9]/g, '').slice(0, compact ? 3 : 5).toUpperCase()
  const iitDomain = iitDomains[resource.name]
  const companySlug = companyLogoSlugs[resource.name]
  const sihLogo = resource.name.includes('Smart India Hackathon') ? 'https://www.google.com/s2/favicons?domain=sih.gov.in&sz=256' : undefined
  const officialDomainLogo = resource.domain ? `https://www.google.com/s2/favicons?domain=${resource.domain}&sz=256` : undefined
  const localLogo = localLogoSources[resource.name] || localLogoSources[resource.logo || '']
  const imageSrc = resource.logoUrl || localLogo || sihLogo || officialDomainLogo || (iitDomain ? `https://www.google.com/s2/favicons?domain=${iitDomain}&sz=128` : companySlug ? `https://cdn.simpleicons.org/${companySlug}` : undefined)
  return <span className={'logo-mark' + (vector ? ' vector' : '') + (large ? ' large' : '')} title={resource.name} style={vector && !imageSrc ? { color: '#' + vector.hex } : undefined}>
    {imageSrc && !failed ? <img src={imageSrc} alt={`${resource.name} logo`} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} /> : vector ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={vector.path} /></svg> : <b>{letters}</b>}
  </span>
}
function ExternalButton({ href, children = 'Visit portal', className = '' }: { href?: string; children?: ReactNode; className?: string }) { return href ? <a className={'link-button ' + className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={14} /></a> : <span className={'link-button disabled ' + className}>Link awaited</span> }
function ResourceCard({ resource, video = false }: { resource: Resource; video?: boolean }) { return <article className={'resource-card' + (video ? ' video-card' : '')} data-reveal><div className="resource-card-top"><LogoMark resource={resource} /><span>{resource.label}</span></div><div className="resource-card-copy"><h3>{resource.name}</h3><p>{resource.description}</p></div><ExternalButton href={resource.href}>{resource.actionLabel || (video ? 'Watch channel' : 'Visit portal')}</ExternalButton></article> }
function CertificationPlatformCard({ resource, certificate, onOpen }: { resource: Resource; certificate?: ReferenceImage; onOpen: (image: ReferenceImage) => void }) {
  return <article className="certification-platform-card" data-reveal>
    <div className="certification-platform-info">
      <div className="certification-platform-top"><LogoMark resource={resource} /><span>{resource.label}</span></div>
      <div className="certification-platform-copy"><h3>{resource.name}</h3><p>{resource.description}</p></div>
      <ExternalButton href={resource.href}>Visit portal</ExternalButton>
    </div>
    {certificate && <section className="platform-certificate" aria-label={`My ${resource.name} certificate`}>
      <div className="platform-certificate-heading"><span>My credential</span><h4>{certificate.title}</h4></div>
      <button className="platform-certificate-preview" type="button" onClick={() => onOpen(certificate)} aria-label={`View ${certificate.name} document`}><img src={certificate.src} alt={`${certificate.name} document preview`} loading="lazy" /><span aria-hidden="true"><FileText size={16} /></span></button>
      <button className="platform-certificate-view" type="button" onClick={() => onOpen(certificate)}>View document <Maximize2 size={14} /></button>
    </section>}
  </article>
}
function AcademicYearFlipCard({ year, onSubjectSelect }: { year: AcademicYear; onSubjectSelect: (subject: AcademicSubject) => void }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const selectSubject = (subject: AcademicSubject) => { setIsFlipped(false); onSubjectSelect(subject) }
  return <article className={`year-flip-card${isFlipped ? ' is-flipped' : ''}`} onKeyDown={event => { if (event.key === 'Escape') setIsFlipped(false) }}>
    <div className="year-flip-card-inner">
      <button className="year-flip-card-face year-flip-card-front" type="button" onClick={() => setIsFlipped(value => !value)} aria-pressed={isFlipped} aria-label={`${isFlipped ? 'Close' : 'Open'} the ${year.title} RGPV subject list`}>
        <span className="year-card-orbit year-card-orbit-one" aria-hidden="true" /><span className="year-card-orbit year-card-orbit-two" aria-hidden="true" />
        <span className="year-card-badge">{year.badge}</span><span className="year-card-subtitle">{year.subtitle}</span><strong>{year.title}</strong><span className="year-card-prompt">Explore subjects <ArrowUpRight size={14} /></span>
      </button>
      <div className="year-flip-card-face year-flip-card-back" aria-label={`${year.title} subject list`}>
        <div className="year-card-back-header"><div><b>{year.title} RGPV</b><span>Select a subject to access study resources.</span></div><button type="button" onClick={() => setIsFlipped(false)} tabIndex={isFlipped ? 0 : -1} aria-label={`Return to ${year.title} card`}><X size={15} /></button></div>
        <div className="year-subject-list">{year.subjects.map((subject, index) => <button className={`year-subject-row${subject.resource ? ' has-resources' : ''}`} type="button" key={subject.id} onClick={() => selectSubject(subject)} tabIndex={isFlipped ? 0 : -1}><span>{String(index + 1).padStart(2, '0')}</span><b>{subject.name}</b>{subject.resource && <i>FEATURED SUBJECT</i>}<ChevronRight size={15} /></button>)}</div>
      </div>
    </div>
  </article>
}
function SubjectDocumentActions({ href, filename, label }: { href: string; filename: string; label: string }) { return <div className="subject-document-actions"><a href={href} target="_blank" rel="noopener noreferrer">View {label} <ArrowUpRight size={13} /></a><a href={href} download={filename}>Download {label} <Download size={13} /></a></div> }
function PyqLibrary({ resource }: { resource: SubjectStudyResource }) { return <article className="pyq-library"><header><div className="pyq-library-title"><span className="subject-resource-icon"><FileText size={18} /></span><div><p>Original RGPV paper library</p><h4>Previous Year Question Papers</h4><span>{resource.pyqPapers.length} uploaded papers · Choose any paper to open it.</span></div></div><a className="pyq-download-all" href={resource.pyqArchiveUrl} download={resource.pyqArchiveName}><Download size={15} />Download All PYQs (.ZIP)</a></header><div className="pyq-paper-grid">{resource.pyqPapers.map((paper, index) => <a key={paper.filename} href={paper.href} target="_blank" rel="noopener noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><div><b>{paper.title}</b><small>Open original PDF</small></div><ArrowUpRight size={14} /></a>)}</div></article> }
function SubjectResourceDashboard({ subject, year, onBack }: { subject: AcademicSubject; year: AcademicYear; onBack: () => void }) {
  const resource = subject.resource
  const resourceStatus = (title: string, description: string) => <article className="subject-resource-action is-unavailable"><span className="subject-resource-icon"><FileText size={18} /></span><div><p>Resource unavailable</p><h4>{title}</h4><span>{description}</span></div><small>Awaiting material</small></article>
  return <section id="subject-resource-dashboard" className="subject-resource-dashboard" aria-labelledby="subject-resource-title">
    <button className="subject-dashboard-close" type="button" onClick={onBack} aria-label="Close subject dashboard" title="Close subject dashboard"><X size={18} /></button>
    <button className="subject-dashboard-back" type="button" onClick={onBack}><ArrowUp size={15} />Back to academic years</button>
    <header className="subject-dashboard-header"><div><p>RGPV subject resource dashboard</p><h3 id="subject-resource-title">{subject.name}</h3><span>{year.title} RGPV{subject.semester ? ` · ${subject.semester}` : ''}</span></div>{subject.code && <b>{subject.code}</b>}</header>
    <div className="subject-resource-action-grid">
      {resource ? <>
        <article className="subject-resource-action subject-resource-chatgpt"><span className="subject-resource-icon"><Sparkles size={18} /></span><div><p>AI-powered learning</p><h4>AI Study Assistant</h4><span>Open the dedicated {resource.code} study-material project in a new tab.</span></div><a href={resource.studyUrl} target="_blank" rel="noopener noreferrer"><Sparkles size={14} />{resource.aiButtonLabel} <ArrowUpRight size={14} /></a></article>
        <PyqLibrary resource={resource} />
        <article className="subject-resource-action"><span className="subject-resource-icon"><FolderKanban size={18} /></span><div><p>Current study-material set</p><h4>Study Materials</h4><span>Additional notes, unit-wise material and reference files have not been uploaded yet. The verified subject pack contains the original paper and syllabus.</span></div><a href={resource.archiveUrl} download={resource.archiveName}><Download size={14} />Download Complete Resources (ZIP)</a></article>
        <article className="subject-resource-action"><span className="subject-resource-icon"><FileText size={18} /></span><div><p>Original PDF</p><h4>Official Subject Syllabus</h4><span>View or download the uploaded RGPV syllabus with original quality preserved.</span></div><SubjectDocumentActions href={resource.syllabusUrl} filename={resource.syllabusName} label="Official Syllabus" /></article>
      </> : <>
        {resourceStatus('Previous Year Question Papers', 'No original PYQ has been added for this subject yet.')}
        {resourceStatus('Official Subject Syllabus', 'No official syllabus has been configured for this subject yet.')}
        {resourceStatus('Study Materials', 'Notes and unit-wise materials will appear here once uploaded.')}
        {resourceStatus('ChatGPT Study Assistant', 'A dedicated AI study assistant has not been configured for this subject.')}
      </>}
    </div>
  </section>
}
function ReferenceGallery({ title, eyebrow = 'Supporting documents', images, onOpen, className = '' }: { title?: string; eyebrow?: string; images: ReferenceImage[]; onOpen: (image: ReferenceImage) => void; className?: string }) {
  return <section className={`reference-gallery ${className}`.trim()} aria-label={title || 'Reference documents'} data-reveal>
    {title && <header className="reference-gallery-heading"><span>{eyebrow}</span><h3>{title}</h3></header>}
    <div className={'reference-grid' + (images.length === 1 ? ' single-reference' : '')}>
      {images.map(image => <article className="reference-card" key={image.name} onClick={() => onOpen(image)}>
        <button className="reference-thumbnail" type="button" onClick={() => onOpen(image)} aria-label={`View ${image.name} document`}><img src={image.src} alt={`${image.name} reference document`} loading="lazy" /><span className="reference-thumbnail-icon" aria-hidden="true"><FileText size={15} /></span></button>
        <div className="reference-card-copy"><div className="reference-card-topline"><span className="reference-type-icon" aria-hidden="true"><FileText size={14} /></span><span>Official reference document</span></div><h3>{image.title}</h3><p>Original document · Click to inspect</p><button className="reference-view-button" type="button" onClick={() => onOpen(image)}>View document <Maximize2 size={14} /></button></div>
      </article>)}
    </div>
  </section>
}
function InstitutionalLogoRail({ position, logos }: { position: 'top' | 'left' | 'right' | 'bottom'; logos: readonly InstitutionalLogo[] }) {
  return <div className={`institutional-logo-rail institutional-logo-rail-${position}`} aria-label={`${position} institutional logos`}>
    {logos.map(logo => <div className="institutional-logo" key={logo.name}><LogoMark resource={logo} large /><span>{logo.label}</span></div>)}
  </div>
}

function InstitutionalDocumentShowcase({ images, onOpen }: { images: ReferenceImage[]; onOpen: (image: ReferenceImage) => void }) {
  return <section className="institutional-document-showcase" aria-labelledby="institutional-documents-title" data-reveal>
    <header className="institutional-document-heading">
      <span>Institutional document showcase</span>
      <h3 id="institutional-documents-title">Letters of Recommendation &amp; Application Resources</h3>
      <p>Original reference documents presented within the institutions and companies that shape an engineering career.</p>
    </header>
    <InstitutionalLogoRail position="top" logos={institutionalDocumentLogos.top} />
    <div className="institutional-document-stage">
      <InstitutionalLogoRail position="left" logos={institutionalDocumentLogos.left} />
      <div className="institutional-document-grid">
        {images.map(image => <article className="institutional-document-card" key={image.name}>
          <button className="institutional-document-preview" type="button" onClick={() => onOpen(image)} aria-label={`View ${image.name} document`}>
            <img src={image.src} alt={`${image.name} reference document`} loading="lazy" />
            <span><Maximize2 size={14} /> View document</span>
          </button>
          <div className="institutional-document-copy"><h4>{image.title}</h4><a href={image.src} target="_blank" rel="noopener noreferrer">Open original <ArrowUpRight size={13} /></a></div>
        </article>)}
      </div>
      <InstitutionalLogoRail position="right" logos={institutionalDocumentLogos.right} />
    </div>
    <InstitutionalLogoRail position="bottom" logos={institutionalDocumentLogos.bottom} />
  </section>
}
function PresentationCard({ presentation }: { presentation: Presentation }) {
  return <article className="sih-presentation-card" data-reveal>
    <a className="sih-presentation-preview" href={presentation.fileUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${presentation.name}`}>
      <img src={presentation.previewUrl} alt={`First slide preview of ${presentation.name}`} loading="lazy" />
      <span><FileText size={14} /> Original PDF</span>
    </a>
    <div className="sih-presentation-copy">
      <p>{presentation.label}</p>
      <h4>{presentation.title}</h4>
      <span>Original presentation document</span>
    </div>
    <div className={`sih-presentation-actions ${presentation.videoUrl ? 'has-video' : 'no-video'}`} aria-label={`${presentation.title} actions`}>
      <a className="presentation-action is-primary" href={presentation.fileUrl} target="_blank" rel="noopener noreferrer">View presentation <Maximize2 size={13} /></a>
      <a className="presentation-action" href={presentation.fileUrl} download={presentation.downloadName}>Download PDF <Download size={13} /></a>
      {presentation.videoUrl && <a className="presentation-action is-video" href={presentation.videoUrl} target="_blank" rel="noopener noreferrer">YouTube demo <Play size={13} fill="currentColor" /></a>}
    </div>
  </article>
}
function ReferencePreview({ image, onClose }: { image: ReferenceImage; onClose: () => void }) { const [zoom, setZoom] = useState(1); const zoomOut = () => setZoom(value => Math.max(.75, Number((value - .25).toFixed(2)))); const zoomIn = () => setZoom(value => Math.min(2.5, Number((value + .25).toFixed(2)))); return <div className="reference-preview-backdrop" role="dialog" aria-modal="true" aria-label={`${image.name} preview`} onClick={onClose}><div className="reference-preview-panel" onClick={event => event.stopPropagation()}><header><div><span>Official reference document</span><h2>{image.title}</h2></div><div className="reference-preview-actions"><button type="button" onClick={zoomOut} aria-label="Zoom out" disabled={zoom <= .75}><Minus size={18} /></button><span aria-label={`Zoom level ${Math.round(zoom * 100)} percent`}>{Math.round(zoom * 100)}%</span><button type="button" onClick={zoomIn} aria-label="Zoom in" disabled={zoom >= 2.5}><Plus size={18} /></button><button type="button" onClick={onClose} aria-label="Close image preview"><X size={20} /></button></div></header><div className="reference-preview-viewport"><img src={image.src} alt={`${image.name} reference document`} style={{ transform: `scale(${zoom})` }} /></div></div></div> }
const preparationHeadingIds: Record<string, string> = { '10': 'documents-title', '11': 'form-guides-title', '12': 'exam-title' }
function getEmbedUrl(videoUrl?: string) { if (!videoUrl) return undefined; try { const url = new URL(videoUrl); if (url.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${url.pathname.slice(1)}`; if (url.hostname.includes('youtube.com')) { const id = url.searchParams.get('v'); return id ? `https://www.youtube.com/embed/${id}` : videoUrl } return videoUrl } catch { return videoUrl } }
function VideoPreview({ resource, featured = false }: { resource: Resource; featured?: boolean }) { const embedUrl = getEmbedUrl(resource.videoUrl); return <div className={'tutorial-media' + (featured ? ' featured-media' : '')} style={!embedUrl && resource.thumbnail ? { backgroundImage: `linear-gradient(rgba(11,11,11,.35), rgba(11,11,11,.72)), url(${resource.thumbnail})` } : undefined}>{embedUrl ? <iframe src={embedUrl} title={resource.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <><span className="media-grid" aria-hidden="true" /><span className="media-play" aria-hidden="true"><Play size={featured ? 24 : 17} fill="currentColor" /></span><span className="media-status"><Video size={13} /> Video coming soon</span></>}</div> }
function UnifiedVideoShowcase({ resource, eyebrow, topics, variant }: { resource: Resource; eyebrow: string; topics: string[]; variant: 'exam' | 'application' }) {
  return <article className={`unified-video-showcase unified-video-showcase-${variant}`} data-reveal>
    <VideoPreview resource={resource} featured />
    <div className="unified-video-copy"><p className="eyebrow">{eyebrow}</p><h3>{resource.name}</h3><p>{resource.description}</p><ul>{topics.map(topic => <li key={topic}>{topic}</li>)}</ul><span><Video size={14} /> Ready for one YouTube tutorial link</span></div>
  </article>
}
function CompactIITCard({ item }: { item: Resource }) { return <article className="iit-card" data-reveal><div className="iit-card-head"><div className="iit-logo-stage"><LogoMark resource={item} compact large /></div><span>Summer research</span></div><h3>{item.name}</h3><p>{item.description}</p>{item.href ? <ExternalButton href={item.href}>Official website</ExternalButton> : <span className="no-link">No link yet</span>}</article> }
function highlight(text: string, query: string) { if (!query.trim()) return text; const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')); return parts.map((part, index) => part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part) }
function SectionHeading({ index, eyebrow, title, description, aside, headingId }: { index: string; eyebrow: string; title: string; description: string; aside?: ReactNode; headingId?: string }) { return <header className="section-heading" data-reveal><div><p className="eyebrow"><span className="eyebrow-index">{index}</span>{eyebrow}</p><h2 id={headingId || preparationHeadingIds[index]}>{title}</h2><p className="section-description">{description}</p></div>{aside && <div className="section-aside">{aside}</div>}</header> }

function DashboardFrame({ title, children }: { title: string; children: ReactNode }) { return <section className="dashboard-frame"><header><span className="dashboard-window-dots"><i /><i /><i /></span><b>{title}</b><span className="dashboard-more">•••</span></header>{children}</section> }
function DashboardRow({ icon, title, detail, badge }: { icon: ReactNode; title: string; detail: string; badge?: string }) { return <div className="dashboard-row"><span className="dashboard-row-icon">{icon}</span><span><b>{title}</b><small>{detail}</small></span>{badge && <em>{badge}</em>}</div> }
function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'open' | 'new' | 'soon' }) { return <span className={`status-pill status-${tone}`}>{children}</span> }
function ProgressRing({ value }: { value: number }) { return <span className="progress-ring" style={{ '--progress': `${value * 3.6}deg` } as CSSProperties}><b>{value}%</b></span> }
function FloatingPanel({ className = '', children }: { className?: string; children: ReactNode }) { return <aside className={`dashboard-float ${className}`}>{children}</aside> }
function AcademicWorkspace() { return <div className="showcase-board showcase-academics"><DashboardFrame title="Academic workspace"><div className="academic-dashboard"><p className="workspace-kicker">SEMESTER 05 · CURATED TRACK</p><h3>Semester 5 · Database<br />Management Systems</h3><div className="workspace-tabs"><b>Syllabus</b><span>Notes</span><span>PYQs</span><span>Videos</span></div><div className="dashboard-row-list"><DashboardRow icon={<FileText size={17} />} title="Unit 3 learning set" detail="6 organised resources" /><DashboardRow icon={<Video size={17} />} title="Normalization visual guide" detail="18 min video lesson" badge="PLAY" /></div></div></DashboardFrame><FloatingPanel className="roadmap-float"><div className="float-title"><span className="float-icon"><Layers3 size={16} /></span><small>Career roadmap</small></div><b>Full-stack foundations</b><div className="roadmap-progress"><ProgressRing value={42} /><span>2 of 5 milestones<br />in motion</span></div></FloatingPanel><FloatingPanel className="opportunities-float"><div className="float-title"><small>Opportunities for you</small><b>See all <ArrowUpRight size={13} /></b></div><DashboardRow icon={<GraduationCap size={15} />} title="NPTEL · Database Systems" detail="Free · 12 weeks" badge="OPEN" /><DashboardRow icon={<BookOpen size={15} />} title="Research project guide" detail="Preparation path" badge="NEW" /><DashboardRow icon={<Rocket size={15} />} title="Innovation sprint" detail="Deadline · 18 Nov" badge="SOON" /></FloatingPanel></div> }
function InnovationWorkspace() { return <div className="showcase-board showcase-innovation"><DashboardFrame title="Innovation workspace"><div className="innovation-dashboard"><p className="workspace-kicker">BUILD WITH A TEAM</p><h3>Build Something<br />That Matters.</h3><div className="project-strip"><span><FolderKanban size={16} /></span><div><small>PROJECT</small><b>National Innovation Challenge</b></div><strong>68%</strong></div><div className="milestone-list"><span className="done"><i><Check size={10} /></i>Problem statement</span><span className="done"><i><Check size={10} /></i>Team formation</span><span className="current"><i />Prototype development</span><span><i />Final submission</span></div></div></DashboardFrame><FloatingPanel className="hackathon-float"><div className="float-title"><span className="float-icon"><Rocket size={16} /></span><small>Hackathon discovery</small></div><b>Find your next build</b><span>Smart India Hackathon</span><span>Unstop Challenges</span><span>International Hackathons</span><StatusPill tone="open">Registration open</StatusPill></FloatingPanel><FloatingPanel className="startup-float"><div className="float-title"><small>Startup ecosystem</small><StatusPill tone="new">Explore</StatusPill></div><b>Y Combinator</b><div className="startup-options"><span>Startup application</span><span>Founder resources</span><span>Accelerator programs</span></div><div className="startup-footer"><Users size={14} /> Founder network · upcoming</div></FloatingPanel></div> }
function ResearchWorkspace() { return <div className="showcase-board showcase-research"><DashboardFrame title="Research application studio"><div className="research-dashboard"><p className="workspace-kicker">RESEARCH · INTERNSHIPS · DOCUMENTS</p><h3>Prepare Your<br />Research Application.</h3><div className="document-preview-grid"><div><FileText size={17} /><span><b>ISRO Resume / CV</b><small>Professional document</small></span><StatusPill tone="open">PDF</StatusPill></div><div><FileText size={17} /><span><b>DRDO Resume / CV</b><small>Research application</small></span><StatusPill tone="open">PDF</StatusPill></div><div><ClipboardCheck size={17} /><span><b>Letter of Recommendation</b><small>LOR preparation resources</small></span><StatusPill tone="soon">DOC</StatusPill></div></div></div></DashboardFrame><FloatingPanel className="checklist-float"><div className="float-title"><span className="float-icon"><ClipboardCheck size={16} /></span><small>Application checklist</small></div><div className="checklist-items"><span><i><Check size={10} /></i>Resume prepared</span><span><i><Check size={10} /></i>LOR requested</span><span><i><Check size={10} /></i>Academic details</span><span><i><Check size={10} /></i>Supporting documents</span></div><div className="checklist-progress"><span><i /></span><b>75% ready</b></div></FloatingPanel><FloatingPanel className="research-opportunities-float"><div className="float-title"><small>Research opportunities</small><Landmark size={15} /></div><DashboardRow icon={<GraduationCap size={15} />} title="ISRO Internship" detail="Space research" badge="OPEN" /><DashboardRow icon={<FileText size={15} />} title="DRDO Internship" detail="Defence research" badge="OPEN" /><DashboardRow icon={<BookOpen size={15} />} title="Government research programs" detail="Browse portals" badge="NEW" /></FloatingPanel></div> }
function HeroDashboardSlide({ id }: { id: typeof heroSlides[number]['id'] }) { if (id === 'innovation') return <InnovationWorkspace />; if (id === 'research') return <ResearchWorkspace />; return <AcademicWorkspace /> }

function StatCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCurrent(value); return }
      const startedAt = performance.now()
      const animate = (now: number) => { const progress = Math.min((now - startedAt) / 900, 1); setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(animate) }
      requestAnimationFrame(animate)
    }, { threshold: .55 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])
  return <article className="hero-stat" ref={ref}><b>{current}{suffix}</b><span>{label}</span></article>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('btech-theme') as Theme) || 'dark')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('isro')
  const [companyFilter, setCompanyFilter] = useState<'All' | Company['group']>('All')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [heroSlide, setHeroSlide] = useState(0)
  const [, setCarouselHoverPaused] = useState(false)
  const [carouselReset, setCarouselReset] = useState(0)
  const [selectedReference, setSelectedReference] = useState<ReferenceImage | null>(null)
  const [selectedAcademicSubject, setSelectedAcademicSubject] = useState<AcademicSubject | null>(null)
  const carouselTouchStart = useRef<number | null>(null)
  const results = useMemo(() => { const normalized = query.trim().toLowerCase(); return normalized ? allResources.filter(item => `${item.name} ${item.description} ${item.label} ${item.group || ''}`.toLowerCase().includes(normalized)) : [] }, [query])
  const shownCompanies = companyFilter === 'All' ? companies : companies.filter(company => company.group === companyFilter)
  const selectedAcademicYear = selectedAcademicSubject ? academicYears.find(year => year.subjects.some(subject => subject.id === selectedAcademicSubject.id)) : undefined

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('btech-theme', theme) }, [theme])
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    let revealObserver: IntersectionObserver | undefined
    let navObserver: IntersectionObserver | undefined

    const showAllRevealNodes = () => revealNodes.forEach(node => {
      node.classList.remove('reveal-pending')
      node.classList.add('in-view')
    })
    const onViewportChange = () => {
      if (window.innerWidth <= 1024) showAllRevealNodes()
    }

    // Content must never depend on animation support to be discoverable. Only
    // elements already close to the viewport opt into the entrance animation;
    // cards further down the page stay visible even during a very fast scroll.
    if ('IntersectionObserver' in window) {
      if (window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const pendingRevealNodes = revealNodes.filter(node => {
          const bounds = node.getBoundingClientRect()
          return !node.classList.contains('in-view') && bounds.top < window.innerHeight * 1.15 && bounds.bottom > -80
        })

        pendingRevealNodes.forEach(node => node.classList.add('reveal-pending'))
        revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending')
            entry.target.classList.add('in-view')
            revealObserver?.unobserve(entry.target)
          }
        }), { threshold: 0.08 })
        pendingRevealNodes.forEach(node => revealObserver?.observe(node))
      } else {
        showAllRevealNodes()
      }

      navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id as SectionId)
      }), { rootMargin: '-22% 0px -67% 0px' })
      navItems.forEach(item => {
        const section = document.getElementById(item.id)
        if (section) navObserver?.observe(section)
      })
    } else {
      showAllRevealNodes()
    }

    window.addEventListener('resize', onViewportChange, { passive: true })
    onViewportChange()

    return () => {
      revealObserver?.disconnect()
      navObserver?.disconnect()
      window.removeEventListener('resize', onViewportChange)
    }
  }, [companyFilter])
  useEffect(() => { const onScroll = () => setShowBackToTop(window.scrollY > 650); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    const overlayOpen = menuOpen || searchOpen || Boolean(selectedReference)
    if (!overlayOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen, searchOpen, selectedReference])
  useEffect(() => { if (!selectedAcademicSubject) return; const timer = window.setTimeout(() => document.getElementById('subject-resource-dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); return () => window.clearTimeout(timer) }, [selectedAcademicSubject])
  useEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = window.setTimeout(() => setHeroSlide(value => (value + 1) % heroSlides.length), 3000); return () => window.clearTimeout(timer) }, [heroSlide, carouselReset])
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { const target = event.target as HTMLElement; if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch() } if (event.key === 'Escape') { setSearchOpen(false); setMenuOpen(false); setSelectedReference(null) } if (target?.tagName === 'INPUT') return }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown) }, [])
  const goTo = (id: SectionId) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }
  const openSearch = () => { setSearchOpen(true); window.setTimeout(() => document.getElementById('global-search')?.focus(), 20) }
  const selectHeroSlide = (index: number) => { setHeroSlide((index + heroSlides.length) % heroSlides.length); setCarouselReset(value => value + 1) }
  const returnToAcademicYears = () => { setSelectedAcademicSubject(null); window.setTimeout(() => document.getElementById('year-study-materials')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0) }

  return <div className="codex-site">
    <header className="topbar"><div className="topbar-inner"><a className="brand" href="#top" aria-label="B.Tech Maker home"><span className="brand-glyph">B</span><span><b>B.TECH MAKER</b><small>OPPORTUNITY CODEX</small></span></a><nav className="desktop-nav" aria-label="Opportunity sections">{navItems.map(item => <button key={item.id} onClick={() => goTo(item.id)} className={activeSection === item.id ? 'active' : ''}>{item.label}</button>)}</nav><div className="topbar-actions"><button className="icon-button search-trigger" onClick={openSearch} aria-label="Search resources"><Search size={18} /><span>Search</span></button><button className="icon-button theme-button" onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')} aria-label="Toggle colour theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button menu-button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={menuOpen}><Menu size={20} /></button></div></div></header>
    {menuOpen && <div id="mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="mobile-menu-bar"><span className="brand"><span className="brand-glyph">B</span><b>B.TECH MAKER</b></span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={21} /></button></div><nav>{navItems.map((item, index) => <button key={item.id} onClick={() => goTo(item.id)}><span>0{index + 1}</span>{item.label}<ChevronRight size={18} /></button>)}</nav></div>}
    {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search opportunity resources"><div className="search-panel"><div className="search-box"><Search size={20} /><input id="global-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search universities, companies, courses or opportunities" /><button onClick={() => { setQuery(''); setSearchOpen(false) }} aria-label="Close search"><X size={20} /></button></div><div className="search-meta"><span>{query ? `${results.length} matching resource${results.length === 1 ? '' : 's'}` : 'Search the complete opportunity codex'}</span>{query && <button onClick={() => setQuery('')}>Clear search</button>}</div><div className="search-results">{query && !results.length && <div className="empty-results"><CircleX size={22} /><b>No destinations found</b><p>Try an institute, company, skill or category.</p></div>}{results.map(item => <button className="search-result" key={item.name} onClick={() => { goTo(item.section); setSearchOpen(false) }}><LogoMark resource={item} compact /><span><b>{highlight(item.name, query)}</b><small>{highlight(item.description, query)}</small></span><em>{item.section}</em><ChevronRight size={17} /></button>)}</div></div></div>}
    <main id="top">
      <section className="hero hero-dashboard-showcase" aria-labelledby="hero-title"><div className="hero-grid"><section className="hero-showcase" data-reveal tabIndex={0} aria-roledescription="carousel" aria-label="B.Tech Maker platform dashboard previews" onMouseEnter={() => setCarouselHoverPaused(true)} onMouseLeave={() => setCarouselHoverPaused(false)} onFocusCapture={() => setCarouselHoverPaused(true)} onBlurCapture={() => setCarouselHoverPaused(false)} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); selectHeroSlide(heroSlide + 1) } if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); selectHeroSlide(heroSlide - 1) } }} onTouchStart={event => { carouselTouchStart.current = event.touches[0]?.clientX ?? null }} onTouchEnd={event => { const start = carouselTouchStart.current; const end = event.changedTouches[0]?.clientX; carouselTouchStart.current = null; if (start === null || end === undefined || Math.abs(start - end) < 42) return; selectHeroSlide(start > end ? heroSlide + 1 : heroSlide - 1) }}><div className="showcase-meta"><span>LIVE PLATFORM PREVIEW</span><small aria-live="polite">0{heroSlide + 1} / 03</small></div><div className="showcase-viewport"><div className="showcase-track" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>{heroSlides.map((slide, index) => <div className="showcase-slide" key={slide.id} aria-hidden={heroSlide !== index}><HeroDashboardSlide id={slide.id} /></div>)}</div></div><div className="showcase-controls"><div className="showcase-caption" aria-live="polite"><span>{heroSlides[heroSlide].tag}</span><b>{heroSlides[heroSlide].title}</b></div><div className="showcase-indicators" role="tablist" aria-label="Showcase slides">{heroSlides.map((slide, index) => <button key={slide.id} onClick={() => selectHeroSlide(index)} aria-label={`Show ${slide.title}`} aria-selected={heroSlide === index} className={heroSlide === index ? 'active' : ''}><i aria-hidden="true"><b /></i><span>0{index + 1}</span></button>)}</div></div></section><div className="hero-copy" data-reveal><h1 id="hero-title">ONE PLATFORM.<br /><i>ENDLESS POSSIBILITIES.</i></h1><p className="hero-description">Your gateway to engineering opportunities, research internships, hackathons, industry certifications, academic resources and global career pathways.</p><div className="hero-buttons"><button className="primary-button" onClick={() => goTo('isro')}>Explore opportunities <ArrowUpRight size={17} /></button><span>{allResources.length} resources & destinations</span></div></div></div><div className="hero-stats" data-reveal><StatCounter value={iitResources.length} label="IIT research programmes" /><StatCounter value={companies.length} suffix="+" label="global companies" /><StatCounter value={internshipResources.length} label="government portals" /><StatCounter value={certificationResources.length} label="certification platforms" /></div></section>
      <section id="isro" className="section section-space"><div className="container"><SectionHeading index="01" eyebrow="Space & research" title="ISRO learning & online courses" description="Official ISRO learning resources, online courses, registration portals and learning management systems." aside={<span className="count-chip">03 resources</span>} /><div className="resource-grid three-grid">{isroResources.map(item => <ResourceCard key={item.name} resource={item} />)}</div><ReferenceGallery title="ISRO Certificates" eyebrow="Featured credentials" images={[referenceImages.isroCertificate, referenceImages.isroCertificate2]} onOpen={setSelectedReference} className="reference-gallery--featured reference-gallery--isro-certificate" /></div></section>
      <section id="hackathons" className="section section-hackathons">
        <div className="container">
          <SectionHeading index="02" eyebrow="National innovation" title="Smart India Hackathon & builder ecosystems" description="One flagship national challenge and direct pathways to the country’s and world’s most active builder communities." />
          <article className="sih-feature" data-reveal><div className="sih-watermark">SIH</div><div className="sih-content"><div className="sih-brand"><LogoMark resource={{ name: 'Smart India Hackathon', logo: 'SIH' }} /><span>MINISTRY OF EDUCATION · INNOVATION CELL</span></div><p className="eyebrow">Featured national opportunity</p><h3>Smart India Hackathon</h3><p>A nationwide innovation initiative connecting students with real-world problem statements from government ministries, public departments and industry.</p><ExternalButton href="https://www.sih.gov.in/" className="bright-button">Visit official portal</ExternalButton></div><div className="sih-side"><span>INDIA’S<br />LARGEST<br />STUDENT<br />INNOVATION<br />PLATFORM</span><div><b>02</b><small>Flagship opportunity</small></div></div></article>
          <ReferenceGallery title="Smart India Hackathon Certificates" eyebrow="SIH participation credentials" images={sihCertificates} onOpen={setSelectedReference} className="reference-gallery--sih" />
          <section className="sih-presentations" aria-labelledby="sih-presentations-title">
            <header className="sih-presentations-heading" data-reveal><span>Project archive</span><h3 id="sih-presentations-title">SMART INDIA HACKATHON — PROJECT PRESENTATIONS</h3><p>Explore the selected and submitted project presentations from Smart India Hackathon 2024 and 2025.</p></header>
            <div className="sih-presentations-subheading"><span>01 — Selected presentations</span><p>Selected project presentations from SIH 2024 and 2025.</p></div>
            <div className="sih-presentation-grid sih-presentation-grid--selected">{sihSelectedPresentations.map(presentation => <PresentationCard key={presentation.name} presentation={presentation} />)}</div>
            <div className="sih-presentations-subheading"><span>02 — Other submitted projects | SIH 2025</span><p>Original project submissions from the SIH 2025 archive.</p></div>
            <div className="sih-presentation-grid sih-presentation-grid--submitted">{sihSubmittedPresentations.map(presentation => <PresentationCard key={presentation.name} presentation={presentation} />)}</div>
          </section>
          <div className="subsection-header hackathon-platform-heading"><span>National hackathon platforms</span><p>Indian platforms for innovation challenges, competitions and team building.</p></div>
          <div className="resource-grid hackathon-platform-grid">{hackathonResources.map(item => <ResourceCard key={item.name} resource={item} />)}</div>
        </div>
      </section>
      <section id="academics" className="section academics-section">
        <div className="container">
          <SectionHeading index="04" eyebrow="Academic resources" title="ACADEMICS" description="One focused academic hub for university resources, RGPV subject collections and last-day exam preparation." aside={<span className="count-chip">4 academic years</span>} />
          <section className="academic-resource-collection" aria-labelledby="academic-learning-title">
            <div className="academics-subheading" data-reveal><p>Academic learning &amp; examination resources</p><h3 id="academic-learning-title">Study with official university material and trusted engineering classrooms.</h3></div>
            <div className="academic-layout"><div><div className="subsection-header"><span>University resources</span><p>Official university materials and resources for your curriculum and examination preparation.</p></div><div className="resource-grid two-grid">{academicResources.filter(item => item.group === 'University').map(item => <ResourceCard key={item.name} resource={item} />)}</div></div><div><div className="subsection-header"><span>YouTube classrooms</span><p>Curated engineering lecture series and video-based learning resources.</p></div><div className="video-grid">{academicResources.filter(item => item.group === 'Video').map(item => <ResourceCard key={item.name} resource={item} video />)}</div></div></div>
            <ReferenceGallery title="Academic Performance & Results" eyebrow="Academic achievement showcase" images={[referenceImages.finalMarksheet, referenceImages.seventhSemester, referenceImages.backMarksheet]} onOpen={setSelectedReference} className="reference-gallery--academic" />
          </section>
          <section id="year-study-materials" className="subject-study-materials" aria-labelledby="subject-materials-title">
            <div className="academics-subheading" data-reveal><p>RGPV subject study materials</p><h3 id="subject-materials-title">Choose your academic year, then open the subject that you want to study.</h3><span>Hover to reveal subjects on desktop, or tap a card on mobile. BEEE and TOC include original resources and dedicated AI study spaces.</span></div>
            <div className="year-flip-grid-wrap"><div className="year-flip-grid">{academicYears.map(year => <AcademicYearFlipCard key={year.id} year={year} onSubjectSelect={setSelectedAcademicSubject} />)}</div><span className="academic-grid-separator" aria-hidden="true"><i /><i /></span></div>
            <figure className="exam-writing-sample" data-reveal>
              <figcaption className="exam-writing-sample-copy"><span>RGPV exam answer-writing sample</span><h4>How to Write in an Exam</h4><p>A structured handwritten example with headings, diagrams, comparisons and a conclusion.</p><button className="exam-writing-sample-cta" type="button" onClick={() => setSelectedReference(referenceImages.rgpvExamWriting)}>Explore Full Sample <ArrowUpRight size={15} /></button></figcaption>
              <button className="exam-writing-sample-preview" type="button" onClick={() => setSelectedReference(referenceImages.rgpvExamWriting)} aria-label="View the RGPV exam answer-writing sample in full size">
                <img src={referenceImages.rgpvExamWriting.src} alt="Handwritten RGPV exam answer-writing sample" loading="lazy" />
                <span>View Full Sample ↗</span>
              </button>
            </figure>
            <p className="year-flip-note"><Sparkles size={14} />Hover or tap an academic year to flip the card and reveal its subjects.</p>
          </section>
          {selectedAcademicSubject && selectedAcademicYear && <SubjectResourceDashboard subject={selectedAcademicSubject} year={selectedAcademicYear} onBack={returnToAcademicYears} />}
        </div>
      </section>
      <section id="certifications" className="section section-soft"><div className="container"><SectionHeading index="05" eyebrow="Professional learning" title="Professional certifications & skill development" description="Explore professional certifications, industry-recognised courses, technical learning programmes and free skill-development opportunities." aside={<span className="count-chip">{certificationResources.length} platforms</span>} /><div className="certification-platform-grid">{certificationResources.map(item => <CertificationPlatformCard key={item.name} resource={item} certificate={professionalCertificatesByPlatform.get(item.name)} onOpen={setSelectedReference} />)}</div></div></section>
      <section id="internships" className="section"><div className="container"><SectionHeading index="06" eyebrow="Government opportunities" title="Government internship opportunities" description="Discover internships, research opportunities, government programmes and professional exposure offered by ministries, departments and national institutions." aside={<span className="count-chip">15 official portals</span>} /><div className="resource-grid internship-grid">{internshipResources.map(item => <ResourceCard key={item.name} resource={item} />)}</div><p className="directory-note"><Landmark size={15} /> The DRDO single-time form is intentionally shown as unavailable until an official URL is supplied.</p><ReferenceGallery title="ISRO Internship Offer Letters" eyebrow="Original internship credentials" images={[referenceImages.isroHsfOfferLetter, referenceImages.isroVsscOfferLetter]} onOpen={setSelectedReference} className="reference-gallery--isro-internships" /></div></section>
      <section id="iit" className="section section-iit"><div className="container"><SectionHeading index="07" eyebrow="Research institutes" title="IIT summer research programs" description="Explore official summer research internships, research fellowships, departmental programmes and student research opportunities across all 23 IITs in India." aside={<span className="count-chip"><GraduationCap size={14} /> 23 IITs</span>} /><div className="iit-toolbar" data-reveal><p><b>Institutional directory</b><span>Each entry reflects only the supplied application information. Confirm dates, fees and eligibility at the official source.</span></p><span>23 institutes · compact view</span></div><div className="iit-grid">{iitResources.map(item => <CompactIITCard key={item.name} item={item} />)}</div></div></section>
      <section id="startups" className="section section-soft"><div className="container"><SectionHeading index="08" eyebrow="Startup ecosystem" title="Startup ecosystem & entrepreneurship" description="A focused starting point for students who want to build, find ambitious teams and understand the founder journey." /><article className="yc-feature" data-reveal><div className="yc-emblem"><LogoMark resource={startupResource} /></div><div><p className="eyebrow">{startupResource.label}</p><h3>{startupResource.name}</h3><p>{startupResource.description}</p></div><ExternalButton href={startupResource.href}>Explore Y Combinator</ExternalButton></article></div></section>
      <section id="careers" className="section section-careers"><div className="container"><SectionHeading index="09" eyebrow="Global careers" title="Multinational engineering careers" description="Explore direct corporate career portals, off-campus hiring opportunities, graduate programmes and fresher recruitment pathways across global technology companies." aside={<span className="count-chip">33 companies</span>} /><div className="company-controls" data-reveal><span>Browse by sector</span><div>{(['All', 'Big Tech', 'Indian IT', 'Semiconductor', 'Cloud & SaaS'] as const).map(filter => <button key={filter} onClick={() => setCompanyFilter(filter)} className={companyFilter === filter ? 'active' : ''}>{filter === 'All' ? 'All (33)' : filter}</button>)}</div><small>{shownCompanies.length} destinations</small></div><div className="company-grid" key={companyFilter}>{shownCompanies.map(company => <a className="company-card" key={company.name} href={company.href} target="_blank" rel="noopener noreferrer" data-reveal><div className="company-brand"><LogoMark resource={company} large /><span>{company.group}</span></div><div className="company-copy"><h3>{company.name}</h3><p>Official engineering careers</p></div><footer><span>Explore careers</span><ArrowUpRight size={15} /></footer></a>)}</div></div></section>
      <section id="preparation" className="section">
        <div className="container">
          <section className="prep-module" aria-labelledby="documents-title">
            <InstitutionalDocumentShowcase images={[referenceImages.lor1, referenceImages.lor2, referenceImages.resume1, referenceImages.resume2]} onOpen={setSelectedReference} />
          </section>
          <div className="upcoming-display-heading" data-reveal><h2>UPCOMING</h2></div>
          <section className="academic-exam-module exam-module" aria-labelledby="exam-title"><SectionHeading index="04.3" eyebrow="One-day-before-exam preparation" title="Your Last 24 Hours. Prepared Better." description="One focused video covers your last-day revision strategy, important topic prioritisation, time management and a practical exam-day checklist." headingId="exam-title" /><UnifiedVideoShowcase resource={examFeatureResource} eyebrow="Complete preparation walkthrough" topics={['Last-Day Revision Strategy', 'Important Topics Prioritisation', 'Time Management During Exams', 'Exam-Day Checklist']} variant="exam" /></section>
          <section className="prep-module form-guides" aria-labelledby="form-guides-title"><SectionHeading index="11" eyebrow="Application tutorials" title="Application form filling guides" description="One guided video covers the ISRO, DRDO and Government internship application processes in a single clear walkthrough." /><UnifiedVideoShowcase resource={applicationGuideFeatureResource} eyebrow="Complete application walkthrough" topics={['ISRO Internship Application Process', 'DRDO Internship Application Process', 'Government Internship Application Process']} variant="application" /></section>
        </div>
      </section>
    </main>
    {selectedReference && <ReferencePreview image={selectedReference} onClose={() => setSelectedReference(null)} />}
    <footer className="site-footer"><div className="container footer-inner"><div className="brand"><span className="brand-glyph">B</span><span><b>B.TECH MAKER</b><small>OPPORTUNITY CODEX</small></span></div><p>Official sources. Clearer next moves for engineering students.</p><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp size={15} /></button></div></footer>{showBackToTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={18} /></button>}
  </div>
}
export default App
