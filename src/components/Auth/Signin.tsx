import React, { useState } from "react"
import { useRouter } from 'next/router';
import signIn from "../../firebase/auth/signin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SigninProps {
    goToSignUp: () => void;
}

export const Signin = ({ goToSignUp }: SigninProps) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isDisabled = !email || !password

    const handleSignUp = async () => {
        if (!email) {
            toast.error("Email cannot be blank");
        } else {
            const { result, error } = await signIn(email, password);
            if (error) {
                toast.error("Email or password is incorrect");
                console.log("Error with sign in", error)
            } else {
                toast.success(`Welcome to Revive, ${result?.user.email}!`);
                router.push("/home")
            }
        }
    };

    return <div>
        <div className="text-2xl">Sign in</div>
        <div className="mb-4">
            <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button className={`bg-primary text-white py-3 px-4 rounded-md w-full ${isDisabled
            ? 'cursor-not-allowed opacity-50 pointer-events-none'
            : ''
            }`} onClick={handleSignUp}>
            Sign in
        </button>
        <div className="flex mt-4 text-sm">
            <div>Don't have an account?</div>
            <button className="ml-2 font-bold" onClick={goToSignUp}>Sign up</button>
        </div>
        <ToastContainer />
    </div>
}