'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSocialsOpen, setMobileSocialsOpen] = useState(false);

    return (
        <header className="fixed md:relative top-4 left-4 right-4 md:top-auto md:left-auto md:right-auto z-50 md:z-10 mt-0 md:mt-8 mx-0 md:mx-16 w-auto md:w-auto bg-black text-white border border-b-2 border-neutral-300 rounded-2xl">
            <nav className="mx-auto flex items-center justify-between px-6 py-4 lg:px-8 md:mx-0">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="">
                        <Image src="/images/logo.png" alt="logo" width={500} height={500} className='w-32 h-auto' />
                    </div>
                   
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link href="#home" className="text-base hover:text-gray-300 transition-colors">
                        Home
                    </Link>
                    <Link href="/blog" className="text-base hover:text-gray-300 transition-colors">
                        Blog
                    </Link>
                    <Link href="#" className="text-base hover:text-gray-300 transition-colors">
                        Whitepaper
                    </Link>
                    <Link href="/privacy-policy" className="text-base hover:text-gray-300 transition-colors">
                        Privacy Policy
                    </Link>
                    <div className="relative group">
                        <button
                            className="flex items-center gap-1 text-base hover:text-gray-300 transition-colors"
                            aria-haspopup="menu"
                            aria-expanded={false}
                        >
                            Socials
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        <div className="absolute left-0 z-20 mt-2 hidden w-48 rounded-lg border border-gray-800 bg-black p-2 shadow-xl group-hover:block">
                            <a
                                href="https://x.com/zuvanetwork"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-md px-3 py-2 text-sm hover:bg-gray-900"
                            >
                                X (Twitter)
                            </a>
                            <a
                                href="https://t.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-md px-3 py-2 text-sm hover:bg-gray-900"
                            >
                                Telegram
                            </a>
                            <a
                                href="https://medium.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-md px-3 py-2 text-sm hover:bg-gray-900"
                            >
                                Medium
                            </a>
                        </div>
                    </div>
                    <a
                        href="#download"
                        className="rounded-full border-b-3 border-r-3 border-gray-500 bg-gray-200 px-8 py-3 text-base font-medium text-black hover:bg-gray-300 transition-colors"
                    >
                        Download App
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-auto left-4 right-4 bg-black border border-gray-800 rounded-2xl z-40">
                    <div className="px-6 py-4 space-y-4">
                        <a
                            href="#story"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Story
                        </a>
                        <a
                            href="#"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Blog
                        </a>
                        <Link
                            href="#"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Whitepapeer
                        </Link>
                        <Link
                            href="/privacy-policy"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Privacy Policy
                        </Link>
                        <div>
                            <button
                                onClick={() => setMobileSocialsOpen(v => !v)}
                                className="flex w-full items-center justify-between text-left text-base hover:text-gray-300 transition-colors"
                                aria-expanded={mobileSocialsOpen}
                                aria-controls="mobile-socials-menu"
                            >
                                <span>Socials</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSocialsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileSocialsOpen && (
                                <div id="mobile-socials-menu" className="mt-2 space-y-2 pl-4">
                                    <a
                                        href="https://x.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-sm hover:text-gray-300 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        X (Twitter)
                                    </a>
                                    <a
                                        href="https://t.me"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-sm hover:text-gray-300 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Telegram
                                    </a>
                                    <a
                                        href="https://medium.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-sm hover:text-gray-300 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Medium
                                    </a>
                                </div>
                            )}
                        </div>
                        <a
                            href="#download"
                            className="block rounded-full bg-gray-200 px-8 py-3 text-center text-base font-medium text-black hover:bg-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Download App
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}