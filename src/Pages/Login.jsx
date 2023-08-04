import { useEffect, useState, useContext } from "react";
import logo from "../Assests/logo.png";
import image from "../Assests/Image4.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Input from "../Components/ui-components/input";
import AuthContext from "../Contexts/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);

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
        login(username, password);
    };

    return (
        <>
            <div className="h-screen flex ">
                <div className="w-1/2 bg-[#F4F6FA]">
                    {/* logo */}
                    <div className="">
                        <img className="m-12 " src={logo} />
                    </div>
                    {/* image */}

                    <div className="flex flex-col justify-between items-center h-auto">
                        <img className="w-[350px] drop-shadow-md" src={image} alt="image" />

                        {/* caption */}
                        <div className="mt-28 mx-32 drop-shadow-sm">
                            <h1 className="text-4xl mb-2 font-medium">
                                Welcome to <span className="text-[#0D76D3]">Bandobast</span>
                            </h1>
                            <p className="text-lg text-[#7B7D92]">
                                Create Bandobast venues and Duties. Monitor the location of
                                police officers deployed on the Bandobast duty in real-time.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-8 w-7/12  flex flex-col justify-center items-center drop-shadow">
                    <h1 className="text-4xl mb-20 font-medium text-center">Login</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <label className="text-base font-medium">Username</label>
                        <Input
                            name="username"
                            className="h-12"
                            type="text"
                            placeholder="Username"
                        />
                        <label className="text-base font-medium mt-8">Password</label>
                        <div className="relative">
                            <Input
                                name="password"
                                className="h-12"
                                type="password"
                                placeholder="Password"
                            />
                            <div
                                className="absolute right-0 bottom-3 mt-8 mr-8"
                                onClick={handlerVisiblePassword}
                            >
                                {eye ? (
                                    <AiFillEye size={25} color="#0D76D3" />
                                ) : (
                                    <AiFillEyeInvisible size={25} color="#0D76D3" />
                                )}
                            </div>
                        </div>
                        <button
                            className="bg-[#0D76D3] text-white rounded-lg mt-12 text-center py-4"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
