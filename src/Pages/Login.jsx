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
    const [credentials, setcredentials] = useState({
        username: "SP_Ghaziabad",
        password: "admin@1234",
    })
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

    const onChangeHander = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const username = credentials.username;
        const password = credentials.password;

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
                    <div className="relative z-20 flex justify-center items-center mt-auto opacity-40">
                        <svg className="spin spinner w-[250px] h-[250px]">
                            <path
                                id="curve"
                                d="M 25 125 A 100 100 0 1 1 25 127"
                            ></path>
                            <text className="text">
                                <textPath
                                    href="#curve"
                                    textLength={Math.floor(Math.PI * 2 * 100)}
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
                                &ldquo;TrackPatrol is an innovative and robust
                                mapping application designed to provide
                                real-time location tracking and management
                                solutions for personnel and emergency
                                situations. &rdquo;
                            </p>
                            <footer className="text-sm">~ PROXYMORONS</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="flex w-full flex-col justify-center space-y-6 ">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign in to Trackpatrol
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your username and password below to
                                signup.
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
                                            value={credentials.username}
                                            onChange={onChangeHander}
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
                                            value={credentials.password}
                                            onChange={onChangeHander}
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
                            {/* <div className="relative">
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
                            </Button> */}
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
