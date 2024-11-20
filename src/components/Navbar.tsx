"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={`${isOpen ? 'overflow-hidden' : ''}`}>
            <nav className="">
                <button
                    className={`circle-nav  ${isOpen ? 'rotate-90' : '-rotate-90'} fixed right-5 top-5 bg-[#0C388D] text-2xl z-[1000] w-14 h-14 rounded-full flex justify-center items-center hover:scale-110 transition-transform duration-500 scale-100`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="text-white transform transition-transform duration-300 -mt-4">
                        ...
                    </span>
                </button>
            </nav>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="circle-grow-when-open bg-black w-[450px] h-[450px] fixed z-[100] -top-44 -right-44 rounded-full flex justify-start pl-16 items-center"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 items-start z-50"
                >
                    <Link href="" className="text-white text-xl hover:underline">
                        Home
                    </Link>
                    <Link href="#about" className="text-white text-xl hover:underline">
                        About me
                    </Link>
                </motion.div>
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2 items-start h-[80%] justify-end z-50"
                >
                    <li>
                        <Link href="#top" className="text-white text-md hover:underline">
                            Top
                        </Link>
                    </li>
                    <li>
                        <Link href="#skills" className="text-white text-md hover:underline">
                            Compétences
                        </Link>
                    </li>
                    <li>
                        <Link href="#projects" className="text-white text-md hover:underline">
                            Mes projets
                        </Link>
                    </li>



                </motion.ul>
            </motion.div>
        </header>
    )
}
