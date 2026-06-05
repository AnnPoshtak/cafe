import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MenuButton() {
    return (
        <>
            <div className="pt-4">
                <button className="group relative bg-[#0077B6] text-white px-10 py-4 rounded-full font-semibold shadow-lg shadow-[#0077B6]/20 hover:bg-[#005B8C] hover:shadow-xl hover:shadow-[#005B8C]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden">
                    <Link href="/menu">
                        <span className="relative z-10 flex items-center gap-2">
                            Відкрити дзен-меню
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-1000" />
                </button>
            </div>
        </>
    )
}