'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

export default function HeaderComponent() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleMenuClick() : void {
    setIsOpen(!isOpen);
  }

  function handleHireMeClick() : void{
    if (isOpen) {
      setIsOpen(false);
    }
    router.push('/me-recruter');
  }
    
  return (
    <>
      <header className={`py-3 px-5 flex items-center justify-between w-full !isOpen && 'border-b-2 border-gray-100' dark:border-gray-400 relative z-20`}>
        <div className={`flex items-center flex-row space-x-2 ${isOpen && 'hidden'}`}>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/117982823?v=4" />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
          <button 
            onClick={handleMenuClick} 
            className={`font-bold text-lg text-[#41806C] text-shadow-md`}
          >
            {isOpen ? 'Fermer' : 'Menu'}
          </button>
        </div>
        <Button variant={"default"} onClick={handleHireMeClick} className={`hover:scale-95 transition-all z-[1000] duration-200`}>
          Me recruter
        </Button>
        <div className={` top-4 right-5 z-[1000] ${isOpen ? 'absolute' : 'hidden'}`}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleMenuClick}
                className=" hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0}}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              duration: isMobile ? 0.5 : 0.2,
            }}
            className="fixed inset-0 bg-[#41806C]/100 dark:bg-black/95 border-b-2 z-10 flex flex-col items-center justify-center"
          >
            <motion.div 
              className="flex flex-col gap-10"
            >
              {[
                { href: "/", title: "Accueil", label: "Retour vers la page principale." },
                { href: "/mes-projets", title: "Mes projets", label: "Qu'est-ce que j'ai à vous montrer." },
                { href: "/blog", title: "Blog personnel", label: "Cela m'arrive de poster des articles sur différents thèmes..." },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1,
                    duration: 0.4
                  }}
                  className="flex items-center space-x-5 hover:text-white transition-all duration-300 hover:scale-105"
                  onClick={handleMenuClick}
                >
                  <span className='text-4xl md:text-6xl font-bold'>{link.title}</span> 
                  <span className={`text-xl ${isMobile && 'hidden'}`}>-</span> 
                  <span className={`text-xl ${isMobile && 'hidden'}`}>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
