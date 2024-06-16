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
const OTPVerification = Loadable(lazy(() => import('../views/OTPVerfication/OTPVerification')));
const AdminProfile = Loadable(lazy(() => import('../views/admin/ProfilePage/AdminProfile')));
const AddAdmin = Loadable(lazy(() => import('../views/admin/AddAdmin/AddAdmin')));
const AdminCustomer = Loadable(lazy(() => import('../views/admin/Customer/Customer')));
const AdminPublisher = Loadable(lazy(() => import('../views/admin/Publisher/Publisher')));
const BookManage = Loadable(lazy(() => import('../views/admin/Book/BookManage')));

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
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '/admin/home', exact: true, element: <HomePage /> },
      { path: '/admin/aboutus', exact: true, element: <AboutUs /> },
      { path: '/admin/profile', exact: true, element: <AdminProfile /> },
      { path: '/admin/addadmin', exact: true, element: <AddAdmin /> },
      { path: '/admin/customers', exact: true, element: <AdminCustomer /> },
      { path: '/admin/book', exact: true, element: <BookManage /> },
      { path: '/admin/publisher', exact: true, element: <AdminPublisher /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
