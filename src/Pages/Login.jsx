import { useStateContext } from "../Contexts/ContextProvider";
import logo from '../Assests/logo.png';
import image from '../Assests/Image4.png';
import eye from '../Assests/password.png';


export default function Login() {

    return <>
        <div className="h-screen flex">
            <div className="bg-[#F4F6FA] w-full">
                <img className="h-16 m-12" src={logo} alt="logo" />

                <div className="flex flex-col items-center w-full">
                    <img className="h-[25rem]" src={image} alt="logo" />

                </div>

                <div className="mt-20 mx-32">
                    <h1 className="text-4xl mb-8 font-medium">Welcome to <span className="text-[#0D76D3]">Bandobast</span></h1>
                    <p className="text-2xl text-[#7B7D92] pr-16">Create Bandobast venues and Duties.
                        Monitor the location of police officers deployed on the Bandobast duty in real-time.</p>
                </div>


            </div>
            <div className="w-[130rem]">
                <h1 className="text-4xl mt-56 mb-20 font-medium text-center">Login</h1>
                <div className="flex flex-col justify-center ">
                    <form className="flex flex-col items-center">
                        <div className="flex flex-col">
                            <label className="text-base font-medium">Username</label>
                            <input className="border-none bg-[#F4F6FA] rounded-lg pl-8 pr-36  py-4 mt-2" type="text" placeholder="Username" />

                            <label className="text-base font-medium mt-7 ">Password</label>
                            {/* add password eye logo here */}
                            <div>
                                <input className="border-none bg-[#F4F6FA] rounded-lg pl-8 pr-36 py-4 mt-2" type="password" placeholder="Password" />
                                <img className="relative bottom-9 left-96 h-4" src={eye} alt="eye" />
                            </div>
                            <div className="text-[#0D76D3] text-sm text-right mt-2 font-medium">Forget Password?</div>
                            <button className="border-none  bg-[#0D76D3] font-medium text-white rounded-lg px-10 py-3 mt-7" type="submit">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </>;
}