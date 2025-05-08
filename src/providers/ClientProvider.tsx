"use client";
import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Github, Info, Linkedin, Mail, Terminal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TerminalModal } from "@/components/TerminalModal";

export default function ClientProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false); 

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const lenis = new Lenis();
      function raf(time: DOMHighResTimeStamp) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, [isMobile]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "t") {
        setIsTerminalOpen((prev) => !prev);  
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      {children}
      <aside className="hidden md:flex fixed left-5 top-1/3 flex-col items-start space-y-5 z-50">
        <Button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/florian-filloux-40b4b9243/",
              "_blank"
            )
          }
          className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
        >
          <Linkedin />
        </Button>
        <Button
          onClick={() => window.open("https://github.com/ffillouxdev", "_blank")}
          className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
        >
          <Github />
        </Button>
        <Button
          onClick={() => (window.location.href = "mailto:fillouxflorian56@gmail.com")}
          className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
        >
          <Mail />
        </Button>
        <DropdownMenu onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white"
            >
              <Info />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="ml-2">
            <DropdownMenuLabel>Raccourcis</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                className="bg-transparent"
                variant={"secondary"}
                onClick={() => setIsTerminalOpen(true)}
              >
                Terminal (alt+t) <Terminal />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  );
}
