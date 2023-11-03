
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from 'next/router';

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!auth?.loading && !auth?.user) {
            router.push('/');
        }
    }, [auth])


    return <div>{children}</div>;
}

export default AuthLayout;