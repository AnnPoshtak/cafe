"use client";

import instance from "../api/request";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Sparkles, Utensils } from "lucide-react";

interface IMenu {
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
    isAvailable: boolean;
    category: Category;
    variants: Variant[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Variant {
    id: number;
    title: string;
    price: string;
    sku: string | null;
}

export default function Menu() {
    const [menus, setMenus] = useState<IMenu[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await instance.get<any>(`/menu/`);
                const data = Array.isArray(response) ? response : response.data;
                setMenus(data);
            } catch (error) {
                console.error("Failed to fetch menus:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await instance.get<any>(`/category/`);
                const data = Array.isArray(response) ? response : response.data;
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
        fetchMenus();
    }, []);

    const filteredMenus = selectedCategory
        ? menus.filter(menu => menu.category.id === selectedCategory)
        : menus;

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gradient-to-tr from-[#F5F7FA] via-[#E2EAFC] to-[#E0F2FE] p-4 md:p-8 gap-8 relative overflow-hidden font-sans selection:bg-[#0077B6]/10 pt-24">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E2EAFC] to-[#E0F2FE] opacity-60 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#0077B6]/5 via-[#BBC2E2]/10 to-transparent blur-[140px] pointer-events-none" />

                <nav className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl shadow-[#0077B6]/5 p-6 md:p-8 rounded-[2rem] w-full md:w-64 shrink-0 z-10 transition-all duration-500 hover:shadow-[#0077B6]/10 hover:border-[#0077B6]/10">
                    <h2 className="text-xl font-bold tracking-tight text-[#003459] mb-4 flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-[#005B8C]" />
                        Категорії
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === null
                                        ? "bg-[#005B8C] text-white shadow-md shadow-[#005B8C]/20"
                                        : "text-[#005B8C] hover:bg-[#005B8C]/5 hover:text-[#0077B6]"
                                }`}
                            >
                                Усе меню
                            </button>
                        </li>
                        
                        {categories.map(category => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === category.id
                                            ? "bg-[#005B8C] text-white shadow-md shadow-[#005B8C]/20"
                                            : "text-[#005B8C] hover:bg-[#005B8C]/5 hover:text-[#0077B6]"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl shadow-[#0077B6]/5 rounded-[2.5rem] p-6 md:p-12 max-w-4xl w-full z-10 transition-all duration-500 hover:shadow-[#0077B6]/10 hover:border-[#0077B6]/10">
                    <div className="flex flex-col items-center text-center space-y-4 mb-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#BBC2E2]/40 shadow-sm backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-[#005B8C] animate-pulse" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#005B8C]">
                                Смакуй кожен момент
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#003459]">
                            Наше меню
                        </h1>
                    </div>

                    {filteredMenus.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMenus.map(menu => (
                                <div key={menu.id} className="bg-white/90 backdrop-blur-md border border-[#BBC2E2]/30 shadow-sm rounded-2xl p-5 flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-md">
                                    <div className="relative w-full h-44 mb-4 overflow-hidden rounded-xl bg-gray-100">
                                        <img 
                                            src={menu.imageUrl || "/placeholder.png"} 
                                            alt={menu.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#003459] mb-1.5 line-clamp-1">{menu.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{menu.description}</p>
                                    
                                    <div className="mt-auto pt-3 border-t border-gray-100">
                                        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#0077B6] bg-[#0077B6]/5 px-2 py-0.5 rounded-md mb-2">
                                            {menu.category.name}
                                        </span>
                                        <div className="space-y-1.5">
                                            {menu.variants.map(variant => (
                                                <div key={variant.id} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600 text-xs">{variant.title}</span>
                                                    <span className="text-[#003459] font-bold">{variant.price} грн</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            У цій категорії поки немає страв.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}