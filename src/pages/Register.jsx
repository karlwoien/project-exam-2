import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../forms/validation/userSchema';
import { registerUser, loginUser } from '../api';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import InputField from '../forms/InputField';
import AccountTypeSelector from '../forms/AccountTypeSelector';
import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import { toast } from 'react-toastify';

/**
 * Register page where users can create an account for either a traveler or venue manager.
 * @returns {JSX.Element} - Rendered Register component.
 */

export default function Register() {
  const [error, setError] = useState(null);
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      const userPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        venueManager: venueManager,
      };

      await registerUser(userPayload);

      const loginResponse = await loginUser({
        email: data.email,
        password: data.password,
      });

      setUser(loginResponse.data, loginResponse.data.accessToken);

      toast.success('Registration successful!', {
        position: 'top-center',
        autoClose: 1000,
        onClose: () => navigate('/profile'),
      });
    } catch (err) {
      console.error('Error during registration:', err.message);
      setError('Registration failed. Please try again.');
    }
  };

  useTitle('Register');

  return (
    <div className="mx-auto max-w-md rounded-lg border border-bg-primary p-6">
      <h2 className="mb-4 text-center text-2xl font-normal">Register an account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccountTypeSelector selected={venueManager} setSelected={setVenueManager} />

        <div className="mb-4 text-base">
          {venueManager ? (
            <p className="text-xs">
              A Venue Manager account allows you to list and manage venues for booking. If you want
              to book venues, switch to Traveler.
            </p>
          ) : (
            <p className="text-xs">
              A Traveler account is a customer account used for booking venues. If you want to list
              venues, switch to Venue Manager.
            </p>
          )}
        </div>
        <InputField
          id="name"
          label="Name"
          placeholder="Username"
          register={register('name')}
          error={errors.name?.message}
          aria-label="Name"
        />
        <InputField
          id="email"
          label="Email"
          placeholder="name@stud.noroff.no"
          register={register('email')}
          error={errors.email?.message}
          aria-label="Email address"
        />
        <InputField
          id="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register('password')}
          error={errors.password?.message}
          aria-label="Password"
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          register={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          aria-label="Confirm password"
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-bg-primary py-2 text-white hover:bg-bg-highlight"
        >
          Register
        </button>
        <div className="mb-6 mt-3 flex justify-center space-x-2">
          <p className="text-sm">Already have a user?</p>
          <Link to="/login" className="text-sm text-bg-primary hover:underline">
            Login here
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
