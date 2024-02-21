import { 
    MdDashboard,
    MdAssessment,
    MdAssignment,
    MdLibraryBooks,
    MdPerson,
    MdPeople,
    MdSettings,
    MdHelp,
    MdLogout,

 } from "react-icons/md";

export const teacherDashboardNavLinks = [
    { id: 1, text: 'Dashboard', icon: <MdDashboard/>, href: '/dashboard/teacher' },
    { id: 2, text: 'Quizzes',icon: <MdAssessment/>, href: '/dashboard/teacher/quizzes/' },
    { id: 3, text: 'Assignments',icon:<MdAssignment />, href: '/dashboard/teacher/assignments' },
    { id: 4, text: 'Gradebook',icon:<MdLibraryBooks />, href: '/dashboard/teacher/gradebook' },
    { id: 5, text: 'Students',icon:<MdPerson />, href: '/dashboard/teacher/students' },
    { id: 6, text: 'Groups',icon:<MdPeople />, href: '/dashboard/teacher/groups' },
    { id: 7, text: 'Settings',icon:<MdSettings />, href: '/dashboard/teacher/settings' },
    { id: 8, text: 'Help & Support',icon:<MdHelp />, href: '/dashboard/teacher/help-support' },
    ];  

export const studentDashboardNavLinks = [
    { id: 1, text: 'Dashboard', icon: <MdDashboard/>, href: '/dashboard/student' },
    { id: 2, text: 'Quizzes',icon: <MdAssessment/>, href: '/dashboard/student/quizzes/' },
    { id: 3, text: 'Assignments',icon:<MdAssignment />, href: '/dashboard/student/assignments' },
    { id: 4, text: 'Gradebook',icon:<MdLibraryBooks />, href: '/dashboard/student/gradebook' },
    { id: 5, text: 'Groups',icon:<MdPeople />, href: '/dashboard/student/groups' },
    { id: 6, text: 'Settings',icon:<MdSettings />, href: '/dashboard/student/settings' },
    { id: 7, text: 'Help & Support',icon:<MdHelp />, href: '/dashboard/student/help-support' },
    ];                                                                                                  