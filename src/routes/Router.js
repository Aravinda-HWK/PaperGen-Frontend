import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const AdminLayout = Loadable(lazy(() => import('../layouts/Admin/full/FullLayout')));

/* ****Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const TeacherLogin = Loadable(lazy(() => import('../views/authentication/TeacherLogin')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/Forgetpassword')));
const AuthResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));
const Profile = Loadable(lazy(() => import('../views/ProfilePage/Profile')));
const HomePage = Loadable(lazy(() => import('../views/Home/HomePage')));
const AboutUs = Loadable(lazy(() => import('../views/AboutUs/AboutUs')));
const Classroom = Loadable(lazy(() => import('../views/classroom/Classroom')));
const Paper = Loadable(lazy(() => import('../views/paper/Paper')));
const AddQuestion = Loadable(lazy(() => import('../views/question/Question')));
const StudentList = Loadable(lazy(() => import('../views/StudentList/StudentList')));
const StudentProfile = Loadable(lazy(() => import('../views/student/ProfilePage/Profile')));
const ClassroomStudent = Loadable(lazy(() => import('../views/student/Classroom/Classrrom')));
const PaperListStudent = Loadable(lazy(() => import('../views/student/Paper/Paper')));
const CreatePaper = Loadable(lazy(() => import('../views/student/doPaper/CreatePaper')));
const ResultList = Loadable(lazy(() => import('../views/student/Result/Result')));
const ReviewPaper = Loadable(lazy(() => import('../views/student/Review/Review')));
const OTPVerification = Loadable(lazy(() => import('../views/OTPVerfication/OTPVerification')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/teacherLogin" /> },
      { path: '/home', exact: true, element: <HomePage /> },
      { path: '/classroom', exact: true, element: <Classroom /> },
      { path: '/studentlist', exact: true, element: <StudentList /> },
      { path: '/createpaper', exact: true, element: <Paper /> },
      { path: '/createquestion', exact: true, element: <AddQuestion /> },
      { path: '/aboutus', exact: true, element: <AboutUs /> },
      { path: '/profile', exact: true, element: <Profile /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/teacherLogin', element: <TeacherLogin /> },
      { path: '/auth/forgotpassword', element: <ForgotPassword /> },
      { path: '/auth/resetpassword/:id/:token', element: <AuthResetPassword /> },
      { path: '/auth/otpverification', element: <OTPVerification /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/student',
    element: <AdminLayout />,
    children: [
      { path: '/student/home', exact: true, element: <HomePage /> },
      { path: '/student/aboutus', exact: true, element: <AboutUs /> },
      { path: '/student/classroom', exact: true, element: <ClassroomStudent /> },
      { path: '/student/paper', exact: true, element: <PaperListStudent /> },
      { path: '/student/paper/create/:id', exact: true, element: <CreatePaper /> },
      { path: '/student/result', exact: true, element: <ResultList /> },
      { path: '/student/profile', exact: true, element: <StudentProfile /> },
      { path: '/student/review/:id', exact: true, element: <ReviewPaper /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
