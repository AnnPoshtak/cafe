"use client";

import { useState, useEffect } from 'react';
import { User, ChevronDown, LogOut, Sparkles, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import instance from '../api/request'; 

interface UserProfile {
  id: number;
  email: string;
  role: string;
}

export const ProfileDropdown = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const checkUserAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await instance.get<UserProfile>('/auth/profile');
      setUser(userData);
    } catch (error) {
      console.error('Authentication error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  useEffect(() => {
    if (isOpen) {
      checkUserAuth();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    setIsOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await instance.post('/auth/logout', { userId: Number(userId) });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      
      setUser(null);
      setIsOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="text-[#005B8C]/40 text-xs font-semibold tracking-widest uppercase animate-pulse">
        Дзен...
      </div>
    );
  }

  return (
    <div className="relative inline-block font-sans text-[#003459]">
      
      <button 
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-md
          ${isOpen 
            ? 'border-[#0077B6]/30 bg-white/80 text-[#0077B6]' 
            : 'border-[#BBC2E2]/45 bg-white/40 hover:bg-white/80 hover:border-[#0077B6]/30'
          }`}
      >
        <User size={15} className="stroke-[2.5]" />
        <span className="tracking-wide">{user ? 'Мій Дзен' : 'Увійти'}</span>
        {user && (
          <ChevronDown 
            size={13} 
            className={`stroke-[2.5] transition-transform duration-300 opacity-70 
              ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          />
        )}
      </button>

      {isOpen && user && (
        <div className="absolute right-0 mt-2 w-64 p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-xl shadow-[#0077B6]/5 z-50 text-left animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0077B6]/10 border border-[#0077B6]/20 mb-2">
                <Sparkles className="w-3 h-3 text-[#005B8C]" />
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#005B8C]">
                  {user.role}
                </span>
              </div>
              
              <div className="text-[10px] font-bold text-[#005B8C]/50 tracking-wider uppercase mb-0.5">
                Ви увійшли як:
              </div>
              <div className="text-sm font-medium text-[#003459] break-all tracking-wide flex items-center gap-1.5">
                <Mail size={13} className="text-[#0077B6]/60 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
            
            <div className="h-[1px] bg-[#BBC2E2]/30 my-1" />
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full p-2.5 text-xs font-semibold tracking-wider uppercase text-red-600 border border-red-200 bg-red-50/50 rounded-xl cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut size={13} className="stroke-[2.5]" />
              Вийти з системи
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;