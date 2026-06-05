"use client";
import { useState } from "react";
import Login from "./Login";
import Register from "./Registr";

export default function AuthPage() {
    const [tab, setTab] = useState<"login" | "register">("login");
    return (
        <>
            {tab === "login" && <Login setTab={setTab} />}
            {tab === "register" && <Register setTab={setTab} />}
        </>
    );
}