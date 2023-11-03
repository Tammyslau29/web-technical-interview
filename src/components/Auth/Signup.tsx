import React, { useState } from "react"
import { useRouter } from 'next/router';
import signUp from "../../firebase/auth/signup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignupProps {
    goToSignIn: () => void;
}

export const Signup = ({ goToSignIn }: SignupProps) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isDisabled = !email || !password || !confirmPassword;

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else if (!email) {
            toast.error("Email cannot be blank");
        } else {
            const { result, error } = await signUp(email, password);
            if (error) {
                toast.error("There was an error creating your account");
                console.log("Error with signup", error)
            } else {
                toast.success(`Welcome to Revive, ${result?.user.email}!`);
                router.push("/home-cards")
            }
        }
    };

    return <div>

        <div className="text-2xl">Sign up</div>
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
            <input
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className={`bg-primary text-white py-3 px-4 rounded-md w-full ${isDisabled ? 'cursor-not-allowed opacity-50 pointer-events-none' : ''}`} onClick={handleSignUp}>
            Sign up
        </button>
        <div className="flex mt-6 text-sm">
            <div>Have have an account?</div>
            <button className="ml-2 font-bold" onClick={goToSignIn}>Sign in</button>
        </div>

        <ToastContainer />
    </div>
}