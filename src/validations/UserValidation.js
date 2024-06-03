import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at most 15 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/,
      'Password must contain at least one letter, one number, and one symbol',
    ),
});
