"use client"
import { useCallback, useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, useAnimationControls } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

import SocialLogin from './components/SocialLogin';
import Divider from './components/Divider';
import Input from '@/components/ui/input';
import { nameValidation, passwordValidation } from './validation/validation';
import Loading from '@/components/ui/Loading';
import { useAuth } from './hooks/useAuth';
import FadeIn from '@/components/animation/FadeIn';

enum VARIANTS {
  login = 'LOGIN',
  register = 'REGISTER',
  reset = 'RESET PASSWORD',
}

type Variant = VARIANTS.login | VARIANTS.register | VARIANTS.reset;

const Auth = () => {
  const [variant, setVariant] = useState<Variant>(VARIANTS.login);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const controls = useAnimationControls();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentVariant = searchParams.get('variant');
    if (currentVariant === 'register') {
      setVariant(VARIANTS.register);
    } else if (currentVariant === 'reset') {
      setVariant(VARIANTS.reset);
    } else {
      setVariant(VARIANTS.login);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { loading, register: registerUser, signin, passwordReset } = useAuth(setError);

  const slideOut = async () => {
    await controls.start({ x: 500, opacity: 0, transition: { duration: 0.5 } });
    slideIn();
  };

  const slideIn = async () => {
    await controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
  };

  const isLogin = variant === VARIANTS.login;
  const isRegister = variant === VARIANTS.register;
  const isReset = variant === VARIANTS.reset;

  const changeVariant = (variant: Variant) => {
    clearErrors();
    slideOut();
    setVariant(variant);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isRegister) {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        const message = await registerUser(data);
        toast.success(message);
        changeVariant(VARIANTS.login);
      } catch (error: any) {
        toast.error(error?.message || 'Error');
      }
    }

    if (isLogin) {
      await signin(data);
    }

    if (isReset) {
      try {
        const message = await passwordReset(data);
        toast.success(message);
      } catch (error: any) {
        toast.error(error?.message || 'Error');
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={controls}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 md:p-8"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          {isLogin && "Welcome Back"}
          {isRegister && "Create an Account"}
          {isReset && "Reset Your Password"}
        </h2>

        <FadeIn delay={0.2} direction="up">
          <SocialLogin />
        </FadeIn>
        <FadeIn delay={0.4} direction="up">
          <Divider />
        </FadeIn>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {isRegister && (
            <Input
              label="Name"
              register={register}
              id="name"
              type="text"
              errors={errors}
              validation={nameValidation}
            />
          )}

          <Input
            label="Email"
            register={register}
            id="email"
            type="email"
            errors={errors}
          />

          {!isReset && (
            <div className="relative">
              <Input
                label="Password"
                register={register}
                id="password"
                type={showPassword ? "text" : "password"}
                errors={errors}
                validation={isRegister ? passwordValidation : {}}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          )}

          {isRegister && (
            <div className="relative">
              <Input
                label="Confirm Password"
                register={register}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                errors={errors}
              />
              {showConfirmPassword ? (
                <FaEyeSlash
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? (
              <Loading className="mr-2" />
            ) : isLogin ? (
              "Login"
            ) : isRegister ? (
              "Sign Up"
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          {isLogin && (
            <span className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => changeVariant(VARIANTS.register)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </span>
          )}
          {isRegister && (
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => changeVariant(VARIANTS.login)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
