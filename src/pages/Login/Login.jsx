import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {  toast } from 'react-toastify';
import { loginDataUser } from "../../components/services/UserService";

function Login() {
    const [viewPass,setViewPass] = useState(false);
    const [btnLogin,setBtnLogin] = useState(false);
    const [emailChange,setEmailChange] = useState('');
    const [passwordChange,setPasswordChange] = useState('')
    
const handleLogin = async() => {
    if(emailChange === '' || passwordChange === '') {
        toast.warn('Bạn cần nhập đủ email và password để đăng nhập !!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            return;
    }
    else{
        loginDataUser(emailChange,passwordChange).then(() => {
            toast.success('Bạn đã đăng nhập thành công')
            
        })
    }
    console.log('asdas');
}
    return ( 
        <Container>
        <div className="w-3/5 py-5 rounded-md h-3/4 m-auto mt-5 shadow-lg shadow-gray-900 bg-slate-100 min-w-[500px]">
            <h2 className="grow text-center h-[40px]">Đăng nhập</h2>
            <div className='w-[100%]'>
                <div className=' w-[95%] m-auto p-[15px]'>
                    <label className="text-lg font-semibold">Email :</label>
        <input
        type="text"
        className='outline-none p-2 w-100 grow border-slate-600'
        onChange={(e)=>setEmailChange(e.target.value)}
        />
                </div>
                <div className='w-[95%] m-auto p-[15px]'>
                <label className="text-lg font-semibold">Password :</label>
        <input 
        type={viewPass === false ? 'password' : 'text' } 
        className='outline-none p-2 w-100 grow border-slate-600'
        onChange={(e)=>setPasswordChange(e.target.value)}
        />
        <p>{''}</p>
        <input type="checkbox" 
        onClick={() => setViewPass(!viewPass)}
        /> {'Hiển thị mật khẩu'}
                </div>
            <div className='p-3 flex justify-center item-center'>
       <button
       onClick={handleLogin}
    //   disabled={emailChange === '' || passwordChange === '' ? true : false} 
    className={emailChange && passwordChange ? 'active bg-slate-950 text-white px-5 py-2 rounded-md font-semibold text-lg':'bg-slate-600 text-white px-5 py-2 rounded-md font-semibold text-lg cursor-not-allowed'}>
        Đăng nhập</button>
                </div>
            </div>
        </div>
        </Container>
     );
}

export default Login;