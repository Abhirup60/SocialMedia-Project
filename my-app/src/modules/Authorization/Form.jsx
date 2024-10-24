
import Input from '../../components/Input'
import Button from '../../components/Button'
// import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import Home from '../Home/Home'

const Form = ({
  isSignPage = false
}) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    ...(!isSignPage && {username: ''}),
    email: '',
    password:''
  })

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password || (!isSignPage && !data.username)) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const res = await fetch(`https://social-media-project-server.vercel.app/api/${isSignPage ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  
        credentials: 'include',
      });
  
      if (res.ok) {
        const { token } = await res.json();
        window.localStorage.setItem('user:token', token);
        // console.log('Successfully logged in/registered');
        // alert(`Logged in successfully ${username}`)  
        navigate('/');  // Redirect on success
      } else {
        const errorMessage = await res.text();  
        // console.error('Failed to login/register:', errorMessage);
        alert('Login/Register failed: ' + errorMessage); 
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className='bg-[#d2cfdf] h-screen w-full flex justify-center items-center'>
      <div className='h-[700px] w-[1000px] bg-white flex justify-center items-center'>
        <div className={`h-full w-full flex flex-col justify-center items-center ${!isSignPage && 'order-2'}`}>
            <div className='text-3xl'>WELCOME {isSignPage ? "BACK" : ""}</div>
            <div className='mb-[50px]'>PLEASE {isSignPage ? 'LOGIN' : 'REGISTER'} TO CONTINUE</div>
            <form onSubmit={(e)=> handleSubmit(e)}>
                {isSignPage ? " " :  <Input label='Username' type='text' placeholder='Enter Your Username' value={data.username} onChange={(e)=> setData({...data, username: e.target.value})}/>}

                <Input label='Email' type='email' placeholder='Enter Your Email' value={data.email} onChange={(e)=>setData({...data, email: e.target.value})}/>
                <Input label='Password' type='password' placeholder='Enter Your password' value={data.password} onChange={(e)=>setData({...data, password: e.target.value})}/>

                <Button label={isSignPage ? "Sign In" : "Register"}/>
            </form>
            <div className='cursor-pointer' onClick={()=>{
              navigate(`${isSignPage ? '/account/signup': '/account/signin'}`)
            }}>{isSignPage ? 'Create new account' : 'Already have an account Sign In'}</div>
        </div>
        <div className={`h-full w-full bg-gray-400 ${!isSignPage && 'order-1'}`}></div>
      </div>
    </div>
  )
}

export default Form
