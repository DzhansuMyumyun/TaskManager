import { useEffect, useState } from "react";
import UserLoginForm from "../user/userLoginForm";

export default function Home(){
    const tokenTest = localStorage.getItem("token")
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => { 
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            {!token ? (
                <UserLoginForm />
            ) : (
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800">Welcome Back!</h1>
                    <p className="text-slate-500">Token found: {token.substring(0, 10)}...</p>
                    <button 
                        onClick={() => { localStorage.removeItem("token"); setToken(null); }}
                        className="mt-4 text-red-500 underline"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}