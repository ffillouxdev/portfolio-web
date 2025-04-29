"use client";
import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
export default function ClientProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    }, []);
  
    useEffect(() => {
      if (!isMobile) {
        const lenis = new Lenis();
  
        function raf(time: DOMHighResTimeStamp) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
  
        requestAnimationFrame(raf);
  
        return () => {
          lenis.destroy();
        };
      }
    }, [isMobile]);
    return (
      <>
        {children}
      </>
    );
}
