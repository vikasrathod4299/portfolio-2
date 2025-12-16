import { IconMenu, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

const homeNavLinks = [
  { url: '#skills', label: 'Skills', isHash: true },
  { url: '#experience', label: 'Experience', isHash: true },
  { url: '/blog', label: 'Blog', isHash: false },
]

const blogNavLinks = [
  { url: '/', label: 'Home', isHash: false },
]

export default function Header2() {
    const [menuState, setMenuState] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    
    // Use different nav links based on current page
    const isOnBlogPage = location.pathname.startsWith('/blog');
    const navLinks = isOnBlogPage ? blogNavLinks : homeNavLinks;

    useEffect(()=>{
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 50);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMenuState(false);
        
        // If we're not on the home page, navigate there first
        if (location.pathname !== '/') {
            window.location.href = '/' + href;
            return;
        }
        
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header>
            <nav data-state={menuState && "active"} className="fixed top-4 z-50 w-full px-2">
                <div className={clsx(
                    "mx-auto transition-all duration-300",
                    isScrolled 
                        ? "max-w-4xl backdrop-blur-lg bg-white/70 dark:bg-[#18181b]/70 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg"
                        : "max-w-6xl px-6 lg:px-12", 
                )}>
                    <div className="relative flex items-center justify-between py-3 lg:py-4 px-4">
                        {/* Logo */}
                        <Link to="/" className="group">
                            <h1 className="text-xl sm:text-2xl uppercase tracking-tight text-zinc-800 dark:text-white px-2 py-1 transition-colors duration-150">
                                Vikas Rathod
                            </h1>
                        </Link>

                        {/* Mobile: Menu Button */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? "Close Menu" : "Open Menu"}
                            className="relative z-20 flex items-center justify-center size-10 cursor-pointer rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors lg:hidden"
                        >
                            <IconMenu
                                className={`size-6 transition-all duration-200 ${
                                    menuState ? "rotate-180 scale-0 opacity-0" : ""
                                }`}
                            />
                            <IconX
                                className={`absolute size-6 transition-all duration-200 ${
                                    menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
                                }`}
                            />
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                link.isHash ? (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        onClick={(e) => handleHashClick(e, link.url)}
                                        className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.url}
                                        to={link.url}
                                        className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            <div className="ml-2 border-l border-zinc-300 dark:border-zinc-600 pl-3">
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        <div className={clsx(
                            "lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 backdrop-blur-xl bg-white/90 dark:bg-[#18181b]/90 border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden",
                            menuState ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
                        )}>
                            <div className="p-4">
                                {/* Navigation Links as Pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {navLinks.map((link) => (
                                        link.isHash ? (
                                            <a
                                                key={link.url}
                                                href={link.url}
                                                onClick={(e) => handleHashClick(e, link.url)}
                                                className="px-4 py-2 text-sm font-medium rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-200"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                key={link.url}
                                                to={link.url}
                                                onClick={() => setMenuState(false)}
                                                className="px-4 py-2 text-sm font-medium rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    ))}
                                </div>
                                
                                {/* Bottom Bar with Theme Toggle */}
                                <div className="flex items-center justify-between pt-3 border-t border-zinc-200/50 dark:border-zinc-700/50">
                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">Switch theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}