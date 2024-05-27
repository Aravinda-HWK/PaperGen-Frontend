import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phonenumber: Yup.string()
    .required('Phone number is required')
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at most 15 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/,
      'Password must contain at least one letter, one number, and one symbol',
    ),
});
