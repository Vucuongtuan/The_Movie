import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '../../../components/ui/aurora-background';
import { useForm } from 'react-hook-form';
import { Toast } from 'flowbite-react';
import { createAccount, sendOtp } from '../../../services/auth';
import LoadingLayout from '../../../components/LoadingElement/loadingLayout';
export default function SignUp() {
  const [status, setStatus] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const watchEmail = watch('email');
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!isChecked) {
        return;
      }
      const res = await createAccount(data);
      console.log(res);
      if (res.data.status === 'success') {
        setIsLoading(false);
        setStatus(true);
      } else {
        setIsLoading(false);
        setStatus(false);
      }
    } catch (error) {
      alert(error);
      setStatus(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendOTP = useCallback(async () => {
    setIsLoading(true);
    try {
      if (watchEmail && watchEmail.length === 0) {
        alert('Vui lòng nhập email để có thể lấy mã otp');
        return;
      }
      const res = await sendOtp(watchEmail);
      if (res.data.status === 'success') setIsLoading(false);
      else if (res.data.status === 'failed') setIsLoading(false);
    } catch (e) {
      setStatus(false);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <main className='w-full h-full relative'>
      <AuroraBackground className=' ' />
      <section className='flex absolute top-0  justify-center items-center py-24 bg-transparent z-0 px-40 md:px-2  h-full w-full'>
        <div className='w-1/2 h-full bg-[#1e1e1e] rounded-lg px-4 py-2   transform md:w-full'>
          {isLoading ? (
            <LoadingLayout />
          ) : (
            <>
              <h1 className='text-5xl p-2 font-semibold md:text-4xl'>
                Đăng ký
              </h1>
              <form
                className='space-y-4 py-2 md:space-y-2'
                action='#'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    for='name'
                    className='block mb-2 text-sm font-medium text-white dark:text-white'
                  >
                    Your name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    {...register('name', {
                      required: true,
                      maxLength: 80,
                      minLength: 3,
                    })}
                    className='  bg-slate-50 font-semibold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name'
                  />{' '}
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-white dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='  bg-slate-50 font-semibold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    {...register('email', {
                      required: true,
                      maxLength: 80,
                      minLength: 3,
                    })}
                  />{' '}
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                  <label
                    for='password'
                    className='block mb-2 text-sm font-medium text-white dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='  bg-slate-50 font-semibold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    {...register('password', {
                      required: true,
                      maxLength: 80,
                      minLength: 3,
                    })}
                  />{' '}
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className='flex justify-center items-center'>
                  <div className='w-1/2 h-full'>
                    <label
                      for='otp'
                      className='block mb-2 text-sm font-medium text-white dark:text-white'
                    >
                      OTP
                    </label>
                    <input
                      type='number'
                      name='otp'
                      id='otp'
                      className='  bg-slate-50 font-semibold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      {...register('otp', {
                        required: true,
                        maxLength: 80,
                        minLength: 3,
                      })}
                    />{' '}
                    {errors.otp && <p>{errors.otp.message}</p>}
                  </div>
                  <div className='w-1/2 h-full flex px-2 pt-8'>
                    <button
                      onClick={handleSendOTP}
                      className='h-full px-4 bg-black py-2 rounded-lg hover:bg-slate-700 font-medium'
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className='w-4 h-4 border border-gray-300 rounded   bg-black font-semibold focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      for='terms'
                      className='font-light text-gray-500 dark:text-gray-300'
                    >
                      Tôi chấp nhận
                      <span className='px-2 font-medium text-primary-600 hover:underline dark:text-primary-500'>
                        Các điều khoản và điều kiện
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  disabled={isChecked === false}
                  className='w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Create an account
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <Link
                    to={'/sign-in'}
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>
      {status === true ? (
        <Toast className=' absolute bottom-1 right-1 bg-green-400'>
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg  text-white dark:bg-cyan-800 dark:text-cyan-200'></div>
          <div className='ml-3 text-sm font-normal text-white'>
            Đăng ký thành công
          </div>
          <Toast.Toggle onDismiss={() => setStatus(null)} />
        </Toast>
      ) : status === false ? (
        <Toast className=' absolute bottom-1 right-1 bg-red-600'>
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg  text-white dark:bg-cyan-800 dark:text-cyan-200'></div>
          <div className='ml-3 text-sm font-normal text-white'>
            Đăng ký thất bại ,email đã tồn tại hoặc thử lại sau
          </div>
          <Toast.Toggle onDismiss={() => setStatus(null)} />
        </Toast>
      ) : (
        <></>
      )}
    </main>
  );
}
