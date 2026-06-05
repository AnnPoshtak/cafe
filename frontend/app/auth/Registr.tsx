"use client";

import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import instance from "../api/request";
import { api } from "../common/constants";

interface IFormInput {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    id: number;
    role: string;
}

function Register({ setTab }: { setTab: React.Dispatch<React.SetStateAction<"login" | "register">> }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await instance.post<AuthResponse>('/auth/register', {
                email: data.email,
                password: data.password
            });

            const { accessToken, refreshToken, id } = response;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', id.toString());
            router.push('/');
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please check your data and try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#F5F7FA] via-[#E2EAFC] to-[#E0F2FE] p-4 relative overflow-hidden font-sans selection:bg-[#0077B6]/10">

            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E2EAFC] to-[#E0F2FE] opacity-60 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#0077B6]/5 via-[#BBC2E2]/10 to-transparent blur-[140px] pointer-events-none" />

            <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl shadow-[#0077B6]/5 rounded-[2.5rem] p-8 md:p-12 max-w-md w-full z-10 transition-all duration-500 hover:shadow-[#0077B6]/10 hover:border-[#0077B6]/10">

                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#BBC2E2]/40 shadow-sm backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 text-[#005B8C] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#005B8C]">
                            Простір твого спокою
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#003459]">
                        Вітаємо в <span className="bg-gradient-to-r from-[#0077B6] via-[#005B8C] to-[#003459] bg-clip-text text-transparent">MindKey</span>
                    </h1>
                    <p className="text-sm text-[#005B8C]/70 font-light max-w-[280px]">
                        Створіть ключ до свого внутрішнього дзену та улюбленого чаю
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#005B8C]/80 ml-1">
                            Електронна пошта
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#005B8C]/40 group-focus-within:text-[#0077B6] transition-colors duration-200">
                                <Mail className="w-5 h-5" />
                            </div>

                            <input
                                className="w-full bg-white/80 border border-[#BBC2E2]/45 rounded-2xl py-3.5 pr-4 pl-12 text-[#003459] placeholder-[#005B8C]/40 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]/40 focus:bg-white transition-all duration-200 shadow-inner"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email", { required: "Вкажіть ваш email" })}
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-500 text-xs font-medium ml-2 block animate-fade-in">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#005B8C]/80">
                                Пароль
                            </label>
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#005B8C]/40 group-focus-within:text-[#0077B6] transition-colors duration-200">
                                <Lock className="w-5 h-5" />
                            </div>

                            <input
                                className="w-full bg-white/80 border border-[#BBC2E2]/45 rounded-2xl py-3.5 pr-4 pl-12 text-[#003459] placeholder-[#005B8C]/40 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6]/40 focus:bg-white transition-all duration-200 shadow-inner"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Введіть пароль",
                                    minLength: { value: 6, message: "Мінімум 6 символів" }
                                })}
                            />
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs font-medium ml-2 block animate-fade-in">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="pt-3">
                        <button
                            type="submit"
                            className="group relative w-full bg-[#0077B6] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-[#0077B6]/15 hover:bg-[#005B8C] hover:shadow-xl hover:shadow-[#005B8C]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                                Створити акаунт
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-1000" />
                        </button>

                        <Link
                            href={`${api.baseURL}/auth/google`}
                            className="group relative w-full bg-[#0077B6] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-[#0077B6]/15 hover:bg-[#005B8C] hover:shadow-xl hover:shadow-[#005B8C]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden mt-5 flex items-center justify-center gap-2 tracking-wide"
                        >
                            <img src="google.svg" alt="Google" className="w-5 h-5" />
                            Створити за допомогою Google
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-1000" />
                        </Link>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-[#005B8C]/60">
                        Вже маєте чарівний ключ?{" "}
                        <button
                            onClick={() => setTab("login")}
                            className="text-[#0077B6] hover:text-[#003459] font-semibold underline underline-offset-4 decoration-[#0077B6]/30 hover:decoration-[#003459] transition-colors"
                        >
                            Використайте його!
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Register;