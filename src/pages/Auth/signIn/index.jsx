import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuroraBackground } from '../../../components/ui/aurora-background';
import { useForm } from 'react-hook-form';
import { Toast } from 'flowbite-react';
import { LoginAccount } from '../../../services/auth';
import Cookies from 'js-cookie';
export default function SignIn() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await LoginAccount(data);
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      if (res && res.data && res.data.status === 'success') {
        setIsLoading(false);
        const dataa = {
          email: res.data.email,
          name: res.data.name,
          id: res.data.id,
        };

        Cookies.set('token', res.data.token, { expires: res.data.expiresIn });
        localStorage.setItem('dataUser', JSON.stringify(dataa));
        navigate('/');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className='w-full h-full relative'>
      <AuroraBackground className=' ' />
      <section className='flex absolute top-0  justify-center items-center  bg-transparent z-0 px-40 md:px-2  h-[400px] my-24 w-full'>
        <div className='w-1/2 h-full bg-[#1e1e1e] rounded-lg px-4 py-2   transform md:w-full'>
          {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-5 w-5 bg-white rounded-full animate-bounce'></div>
            </div>
          ) : (
            <>
              <h1 className='text-5xl p-2 font-semibold md:text-4xl'>
                Đăng nhập
              </h1>
              <form
                className='space-y-4 py-2 md:space-y-2'
                action='POST'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-white dark:text-white'
                  >
                    Email
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    className='  bg-slate-50 font-semibold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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

                <button
                  type='submit'
                  className='w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Đăng nhập
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Bạn chưa có tài khoản?{' '}
                  <Link
                    to={'/sign-up'}
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Đăng ký ngay{' '}
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
