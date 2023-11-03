import react, { useEffect } from "react"
import AuthLayout from "../layout/AuthLayout"
import logOut from "../firebase/auth/logOut";

const HomePage = () => {
    return (
        <div className="flex flex-row justify-items-center items-center">
            <button className="bg-primary text-white py-3 px-4 rounded-md" onClick={logOut}>Sign out</button>
            <div className="w-3/5">
                <div style={{ width: '500px' }} className="mx-auto">
                    Protected
                </div>
            </div>
        </div>

    )
}
export default function Home() {
    return (
        <AuthLayout>
            <HomePage />
        </AuthLayout>
    );
}

