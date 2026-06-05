'use client';

import { Key } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProfileDropdown } from './Profile';

export default function Header() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="w-full bg-white border-b border-[#BBC2E2]/40 px-6 py-4 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                
                <Link href="/" className="flex items-center gap-2">
                    <Key color="#0077B6" />
                    <p className="font-bold text-xl tracking-tight text-[#0077B6] select-none hover:opacity-90 transition-opacity">
                        Mind<span className="font-light text-[#0297e6]">Key</span>
                    </p>
                </Link>

                <nav className="flex items-center gap-8">
                    <Link href="/menu" className="text-sm font-medium text-[#0077B6]/80 hover:text-[#0077B6] transition-colors duration-200">
                        Меню
                    </Link>
                    <Link href="/gallery" className="text-sm font-medium text-[#0077B6]/80 hover:text-[#0077B6] transition-colors duration-200">
                        Галерея
                    </Link>
                    
                    {isClient ? (
                        <ProfileDropdown />
                    ) : (
                        <div className="text-[#005B8C]/40 text-xs font-semibold uppercase tracking-widest animate-pulse">
                            Дзен...
                        </div>
                    )}
                </nav>

            </div>
        </header>
    );
}