"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get("token");
        
        if (accessToken) {
            try {
                const base64Url = accessToken.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(window.atob(base64));
                
                const userId = payload.sub;

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", payload.refreshToken);
                if (userId) {
                    localStorage.setItem("userId", userId.toString());
                }
                
                router.push("/");
            } catch (err) {
                console.error("Failed to parse token payload", err);
                router.push("/auth");
            }
        } else {
            router.push("/auth");
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
            <p className="text-[#0077B6] font-medium animate-pulse">
                Sync with Google... <span className="ml-2"><svg className="animate-spin h-5 w-5 text-[#0077B6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg></span>
            </p>
        </div>
    );
}