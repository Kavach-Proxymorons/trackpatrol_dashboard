// import { useEffect, useState, useContext } from "react";
// import logo from "../Assests/logo.png";
// import image from "../Assests/Image4.png";
// import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
// import Input from "../Components/ui-components/input";

// export default function Login() {
//     const { login } = useContext(AuthContext);

//     const [eye, setEye] = useState(false);

//     const handlerVisiblePassword = () => {
//         const password = document.querySelector('input[name="password"]');
//         if (password.type === "password") {
//             password.type = "text";
//             setEye(true);
//         } else {
//             password.type = "password";
//             setEye(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const username = e.target.username.value;
//         const password = e.target.password.value;
//         login(username, password);
//     };

//     return (
//         <>
//             <div className="h-screen flex ">
//                 <div className="w-1/2 bg-[#F4F6FA]">
//                     {/* logo */}
//                     <div className="">
//                         <img className="m-12 " src={logo} />
//                     </div>
//                     {/* image */}

//                     <div className="flex flex-col justify-between items-center h-auto">
//                         <img className="w-[350px] drop-shadow-md" src={image} alt="image" />

//                         {/* caption */}
//                         <div className="mt-28 mx-32 drop-shadow-sm">
//                             <h1 className="text-4xl mb-2 font-medium">
//                                 Welcome to <span className="text-[#0D76D3]">Bandobast</span>
//                             </h1>
//                             <p className="text-lg text-[#7B7D92]">
//                                 Create Bandobast venues and Duties. Monitor the location of
//                                 police officers deployed on the Bandobast duty in real-time.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="ml-8 w-7/12  flex flex-col justify-center items-center drop-shadow">
//                     <h1 className="text-4xl mb-20 font-medium text-center">Login</h1>
//                     <form className="flex flex-col" onSubmit={handleSubmit}>
//                         <label className="text-base font-medium">Username</label>
//                         <Input
//                             name="username"
//                             className="h-12"
//                             type="text"
//                             placeholder="Username"
//                         />
//                         <label className="text-base font-medium mt-8">Password</label>
//                         <div className="relative">
//                             <Input
//                                 name="password"
//                                 className="h-12"
//                                 type="password"
//                                 placeholder="Password"
//                             />
//                             <div className="absolute right-0 bottom-3 mt-8 mr-8" onClick={handlerVisiblePassword}>
//                                 {eye ? (
//                                     <AiFillEye size={25} color="#0D76D3" />
//                                 ) : (
//                                     <AiFillEyeInvisible size={25} color="#0D76D3" />
//                                 )}
//                             </div>
//                         </div>
//                         <button className="bg-[#0D76D3] text-white rounded-lg mt-12 text-center py-4" type="submit">
//                             Login
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useState, useContext, useRef } from "react";
import { buttonVariants, Button } from "../Components/ui-components/button";
import Input from "../Components/ui-components/input";
import Label from "../Components/ui-components/label";
import {
    ArrowUpRight,
    Asterisk,
    Eye,
    EyeOff,
    GithubIcon,
    InstagramIcon,
    Loader
} from "lucide-react";
import AuthContext from "../Contexts/AuthContext";

export default function AuthenticationPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const [eye, setEye] = useState(false);
    const passwordRef = useRef();

    const handlerVisiblePassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            setEye(true);
        } else {
            passwordRef.current.type = "password";
            setEye(false);
        }
    };

    const handleDefaultLogin = (e) => {
        login("SP_Ghaziabad", "admin@1234");
    };

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const username = e.target.username.value;
        const password = e.target.password.value;
        login(username, password);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className="">
            <div className="relative h-screen flex-col items-center justify-center md:grid lg:grid-cols-2x lg:px-0 px-6">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        KAVACH - TRACKPATROL
                    </div>

                    {/* <div className="relative z-20 ">
                        <p>KAVACH TRACKPATROL</p>
                        <Asterisk size={500} className="opacity-30"/>
                    </div> */}
                    <div className="relative z-20 flex justify-center items-center mt-auto opacity-40">
                        <svg className="spinner w-[250px] h-[250px]">
                            <path
                                id="curve"
                                d="M 25 125 A 100 100 0 1 1 25 127"
                            ></path>
                            <text className="text">
                                <textPath
                                    href="#curve"
                                    textLength={Math.floor(
                                        Math.PI * 2 * 98
                                    )}
                                    className="text-xl"
                                >
                                    KAVACH - 2023 - TRACKPATROL -
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours
                                of work and helped me deliver stunning designs
                                to my clients faster than ever before.&rdquo;
                            </p>
                            <footer className="text-sm">
                                Team: PROXYMORONS
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="flex w-full flex-col justify-center space-y-6 ">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign up to Trackpatrol
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your username and password below to signup.
                            </p>
                        </div>
                        <div className={cn("grid gap-6 justify-center")}>
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-1">
                                        <Label
                                            // className="sr-only"
                                            htmlFor="email"
                                        >
                                            Username
                                        </Label>
                                        <Input
                                            name="username"
                                            placeholder="username"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="grid gap-1 relative">
                                        <Label
                                            // className="sr-only"
                                            htmlFor="email"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            name="password"
                                            placeholder="some@1234"
                                            type="password"
                                            autoCapitalize="none"
                                            ref={passwordRef}
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                        <div
                                            className="absolute right-0 bottom-3 mt-8 mr-4"
                                            onClick={handlerVisiblePassword}
                                        >
                                            {eye ? (
                                                <Eye size={20} />
                                            ) : (
                                                <EyeOff size={20} />
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        disabled={isLoading}
                                        className="w-auto"
                                    >
                                        {isLoading && (
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                type="button"
                                disabled={isLoading}
                                onClick={handleDefaultLogin}
                            >
                                {isLoading ? (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                )}{" "}
                                Default Login
                            </Button>
                        </div>
                        <div className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <div className="flex justify-center items-center">
                                <Link
                                    // to="/terms"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    // to="/privacy"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
