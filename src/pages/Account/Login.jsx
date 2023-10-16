import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login({ handleClose, showOffcanvas }) {
  const [viewPass, setViewPass] = useState(false);
  const [emailChange, setEmailChange] = useState('');
  const [passwordChange, setPasswordChange] = useState('');
  const [rememberAccount, setRememberAccount] = useState(false);
  const auth = getAuth();
  const navigation = useNavigate();

  useEffect(() => {
    const checkStoreData = JSON.parse(localStorage.getItem('data'));
    if (checkStoreData) {
      setRememberAccount(false);
    }
  }, []);
  const handleLogin = async () => {
    try {
      if (emailChange === '' || passwordChange === '') {
        toast.warn('Bạn cần nhập đủ email và password để đăng nhập !!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      } else {
        getSignInWithEmailAndPassword();
      }
    } catch (e) {
      toast.error('Đăng nhập thất bại !!!', e);
    }
  };
  const getSignInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailChange, passwordChange).then(
        (userSignIn) => {
          toast.success(
            'Đăng nhập thành công !!! , Hello ' + userSignIn.user.email,
          );
          setTimeout(() => {
            const locData = {
              token: userSignIn.user.accessToken,
              email: userSignIn.user.email,
            };
            localStorage.setItem('data', JSON.stringify(locData));
            navigation('/');
          }, 5000);
          console.log(userSignIn);
        },
      );
    } catch (e) {
      toast.error('Đăng nhập thất bại !!!', e);
    }
  };

  return (
    <div className='h-[830px]'>
      <div className='form-account'>
        <h2 className='grow text-center h-[40px]'>Đăng nhập</h2>
        <div className='w-[100%]'>
          <div className=' w-[95%] m-auto p-[15px]'>
            <span className='text-lg font-semibold'>Email :</span>
            <input
              type='text'
              className='outline-none p-2 w-100 grow border-slate-600 text-white bg-slate-600 rounded-sm'
              onChange={(e) => setEmailChange(e.target.value)}
            />
          </div>
          <div className='w-[95%] m-auto p-[15px]'>
            <span className='text-lg font-semibold'>Password :</span>
            <FontAwesomeIcon
              icon={viewPass === false ? faEye : faEyeSlash}
              onClick={() => setViewPass(!viewPass)}
              className='text-white float-right absolute right-[50px] mt-[40px] z-50'
            />
            <input
              type={viewPass === false ? 'password' : 'text'}
              className='z-[1] outline-none p-2 w-100 grow border-slate-600 text-white bg-slate-600 rounded-sm'
              onChange={(e) => setPasswordChange(e.target.value)}
            />
            <p>{''}</p>
            <input
              type='checkbox'
              checked={rememberAccount}
              onChange={() => setRememberAccount(!rememberAccount)}
            />{' '}
            {'Ghi nhớ đăng nhập'}
          </div>
          <div className='p-3 flex justify-center item-center'>
            <button
              onClick={handleLogin}
              //   disabled={emailChange === '' || passwordChange === '' ? true : false}
              className={
                emailChange && passwordChange
                  ? 'active bg-slate-950 text-white px-5 py-2 rounded-md font-semibold text-lg'
                  : 'bg-slate-600 text-white px-5 py-2 rounded-md font-semibold text-lg '
              }
            >
              Đăng nhập
            </button>
          </div>
          <Link to='/register' align='center'>
            Go to register
          </Link>
        </div>
        {/* <TableUser/> */}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme='light'
        />
      </div>
    </div>
  );
}

export default Login;
