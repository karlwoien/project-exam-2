import * as yup from 'yup';

/**
 * Validation schema for user registration, login, and profile updates.
 */

const name = yup
  .string()
  .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed')
  .required('Username is required');

const email = yup
  .string()
  .email('Invalid email')
  .matches(/@stud.noroff.no$/, 'Email must be @stud.noroff.no')
  .required('Email is required');

const password = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');

const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required('Confirm password is required');

const bio = yup.string().max(160, 'Bio must be less than 160 characters').optional();

const avatar = yup
  .object()
  .shape({
    url: yup.string().url('Must be a valid URL').optional(),
    alt: yup.string().max(120, 'Alt text must be under 120 characters').optional(),
  })
  .optional();

const banner = yup
  .object()
  .shape({
    url: yup.string().url('Must be a valid URL').optional(),
    alt: yup.string().max(120, 'Alt text must be under 120 characters').optional(),
  })
  .optional();

/**
 * Main user schema containing all fields.
 * Used for full user validation.
 */
export const userSchema = yup.object().shape({
  name,
  email,
  password,
  confirmPassword,
  bio,
  avatar,
  banner,
});

/**
 * Schema for user registration.
 * Includes name, email, password, and confirmPassword.
 */
export const registerSchema = userSchema.pick(['name', 'email', 'password', 'confirmPassword']);

/**
 * Schema for user login.
 * Includes only email and password.
 */
export const loginSchema = userSchema.pick(['email', 'password']);

/**
 * Schema for profile update.
 * Allows updating bio, avatar URL, and banner URL.
 */
export const updateProfileSchema = yup.object().shape({
  bio: yup.string().max(160, 'Bio must be less than 160 characters').optional(),
  avatarUrl: yup.string().url('Must be a valid URL').optional(),
  bannerUrl: yup.string().url('Must be a valid URL').optional(),
});
