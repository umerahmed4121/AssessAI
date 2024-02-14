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
    { id: 1, text: 'Dashboard', icon: <MdDashboard/>, href: '/teacher-dashboard' },
    { id: 2, text: 'Quizzes',icon: <MdAssessment/>, href: '/dashboard/quizzes' },
    { id: 3, text: 'Assignments',icon:<MdAssignment />, href: '/dashboard/assignments' },
    { id: 4, text: 'Gradebook',icon:<MdLibraryBooks />, href: '/dashboard/gradebook' },
    { id: 5, text: 'Students',icon:<MdPerson />, href: '/dashboard/students' },
    { id: 6, text: 'Groups',icon:<MdPeople />, href: '/dashboard/groups' },
    { id: 7, text: 'Settings',icon:<MdSettings />, href: '/dashboard/settings' },
    { id: 8, text: 'Help & Support',icon:<MdHelp />, href: '/help-support' },
    ];  

export const studentDashboardNavLinks = [
    { id: 1, text: 'Dashboard', icon: <MdDashboard/>, href: '/student-dashboard' },
    { id: 2, text: 'Quizzes',icon: <MdAssessment/>, href: '/dashboard/quizzes' },
    { id: 3, text: 'Assignments',icon:<MdAssignment />, href: '/dashboard/assignments' },
    { id: 4, text: 'Gradebook',icon:<MdLibraryBooks />, href: '/dashboard/gradebook' },
    { id: 5, text: 'Groups',icon:<MdPeople />, href: '/dashboard/groups' },
    { id: 6, text: 'Settings',icon:<MdSettings />, href: '/dashboard/settings' },
    { id: 7, text: 'Help & Support',icon:<MdHelp />, href: '/help-support' },
    ];                                                                                                  