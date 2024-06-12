import {
  IconLogin,
  IconBook2,
  IconUserPlus,
  IconHome,
  IconAccessible,
  IconSchool,
  IconBook,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Home',
    icon: IconHome,
    href: '/home',
  },
  {
    id: uniqueId(),
    title: 'Classroom',
    icon: IconSchool,
    href: '/classroom',
  },
  {
    id: uniqueId(),
    title: 'Student List',
    icon: IconBook,
    href: '/studentlist',
  },
  {
    id: uniqueId(),
    title: 'Book Register',
    icon: IconBook2,
    href: '/registerbook',
  },
  {
    id: uniqueId(),
    title: 'About us',
    icon: IconAccessible,
    href: '/aboutus',
  },

  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/teacherLogin',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
];

export default Menuitems;
