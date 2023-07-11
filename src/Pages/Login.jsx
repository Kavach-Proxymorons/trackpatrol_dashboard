// import { useStateContext } from "../Contexts/ContextProvider";
import { useState } from 'react';
import logo from '../Assests/logo.png';
import image from '../Assests/Image4.png';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';


export default function Login() {

    const [eye, setEye] = useState(false);

    const handlerVisiblePassword = () => {
        const password = document.querySelector('input[name="password"]');
        if (password.type === "password") {
            password.type = "text";
            setEye(true);
        } else {
            password.type = "password";
            setEye(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log(data);
    };

    return <>
        <div className="h-screen flex" >
            <div className='w-1/2 bg-[#F4F6FA]'>
                {/* logo */}
                <img className="m-12 " src={logo} alt="logo" />
                {/* image */}

                <div className='flex justify-center items-center'>
                    <img className='h-[400px]' src={image} alt="image" />
                </div>

                {/* caption */}
                <div className="mt-28 mx-32">
                    <h1 className="text-4xl mb-8 font-medium">Welcome to <span className="text-[#0D76D3]">Bandobast</span></h1>
                    <p className="text-2xl text-[#7B7D92]">Create Bandobast venues and Duties.
                        Monitor the location of police officers deployed on the Bandobast duty in real-time.</p>
                </div>

            </div>
            <div className="w-7/12 flex flex-col justify-center items-center">
                <h1 className="text-4xl mb-20 font-medium text-center">Login</h1>
                <form className='flex flex-col' onSubmit={handleSubmit} >
                    <label className="text-base font-medium">Username</label>
                    <input name="username" className="border-none bg-[#F4F6FA] rounded-lg pl-8 pr-32 py-4 mt-2" type="text" placeholder="Username" />
                    <label className="text-base font-medium mt-8">Password</label>
                    <div className="relative">
                        <input name="password" className="border-none bg-[#F4F6FA] rounded-lg mt-2 pl-8 pr-32 py-4" type="password" placeholder="Password" />
                        <div className="absolute right-0 bottom-4 mt-8 mr-8" onClick={handlerVisiblePassword}>
                            {eye ? <AiFillEye size={25} color='#0D76D3' /> : <AiFillEyeInvisible size={25} color='#0D76D3' />}
                        </div>
                    </div>


                    {/* <button className="absolute right-0 top-0 mt-8 mr-8" type="button" onClick={handlerVisiblePassword}>{eye ? <AiFillEye size={25} color='#0D76D3' /> : <AiFillEyeInvisible size={25} color='#0D76D3' />}</button> */}

                    <button className="bg-[#0D76D3] text-white rounded-lg mt-12 text-center py-4" type="submit">Login</button>
                </form>
            </div>
        </div >
    </>;
}