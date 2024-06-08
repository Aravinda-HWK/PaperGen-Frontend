import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const AdminLayout = Loadable(lazy(() => import('../layouts/Admin/full/FullLayout')));

/* ****Pages***** */
const Products = Loadable(lazy(() => import('../views/products/Products')));
const RegisterPage = Loadable(lazy(() => import('../views/books/RegisterPage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const TeacherLogin = Loadable(lazy(() => import('../views/authentication/TeacherLogin')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/Forgetpassword')));
const AuthResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));
const BoookDetailsPage = Loadable(
  lazy(() => import('../views/books/BookDetails/BoookDetailsPage')),
);
const Profile = Loadable(lazy(() => import('../views/ProfilePage/Profile')));
const HomePage = Loadable(lazy(() => import('../views/Home/HomePage')));
const AboutUs = Loadable(lazy(() => import('../views/AboutUs/AboutUs')));
const Classroom = Loadable(lazy(() => import('../views/classroom/Classroom')));
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
      { path: '/products', exact: true, element: <Products /> },
      { path: '/classroom', exact: true, element: <Classroom /> },
      { path: '/registerbook', exact: true, element: <RegisterPage /> },
      { path: '/aboutus', exact: true, element: <AboutUs /> },
      { path: '/bookdetails', exact: true, element: <BoookDetailsPage /> },
      { path: '/profile', exact: true, element: <Profile /> },
      { path: '/icons', exact: true, element: <Icons /> },
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
