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
                        ? "max-w-4xl bg-white dark:bg-[#18181b] border-2 border-zinc-800 dark:border-white rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                        : "max-w-6xl px-6 lg:px-12", 
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4 px-4">
                        {/* Logo */}
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link to="/" className="group">
                                <h1 className="text-xl sm:text-2xl font-zinc-800 uppercase tracking-tight text-zinc-800 dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-800 px-2 py-1 rounded-lg transition-colors duration-150">
                                    Vikas Rathod
                                </h1>
                            </Link>
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? "Close Menu" : "Open Menu"}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden rounded-lg hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-800 transition-colors"
                            >
                                <IconMenu
                                    className={`size-6 transition-all duration-200 ${
                                        menuState ? "rotate-180 scale-0 opacity-0" : ""
                                    }`}
                                />
                                <IconX
                                    className={`absolute inset-0 m-auto size-6 transition-all duration-200 ${
                                        menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                link.isHash ? (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        onClick={(e) => handleHashClick(e, link.url)}
                                        className="px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-800 dark:text-white border-2 border-transparent rounded-lg hover:border-zinc-800 dark:hover:border-white hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-800 transition-all duration-150"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.url}
                                        to={link.url}
                                        className="px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-800 dark:text-white border-2 border-transparent rounded-lg hover:border-zinc-800 dark:hover:border-white hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-800 transition-all duration-150"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            <div className="ml-2 border-l-2 border-zinc-800 dark:border-white pl-3">
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        <div className={clsx(
                            "lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white dark:bg-[#18181b] border-2 border-zinc-800 dark:border-white rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 overflow-hidden",
                            menuState ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
                        )}>
                            <div className="flex flex-col p-4 space-y-2">
                                {navLinks.map((link) => (
                                    link.isHash ? (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            onClick={(e) => handleHashClick(e, link.url)}
                                            className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-zinc-800 dark:text-white border-2 border-zinc-800 dark:border-white rounded-lg hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-800 transition-all duration-150 text-center"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.url}
                                            to={link.url}
                                            onClick={() => setMenuState(false)}
                                            className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-zinc-800 dark:text-white border-2 border-zinc-800 dark:border-white rounded-lg hover:bg-zinc-800 hover:text-white dark:hover:bg-white dark:hover:text-zinc-800 transition-all duration-150 text-center"
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                ))}
                                <div className="pt-2 border-t-2 border-zinc-800 dark:border-white flex justify-center">
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