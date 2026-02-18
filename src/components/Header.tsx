'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSocialsOpen, setMobileSocialsOpen] = useState(false);

    return (
        <header className="mt-8 mx-4 md:mx-16 bg-black text-white border-2 border-white md:mx-16 rounded-2xl">
            <nav className="mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <Image src="/logo-rough.png" alt="logo" width={50} height={50} />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg font-bold tracking-wide">ZUVA</span>
                        <span className="text-sm font-semibold tracking-wide">NETWORK</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link href="#story" className="text-base hover:text-gray-300 transition-colors">
                        Story
                    </Link>
                    <Link href="/blog" className="text-base hover:text-gray-300 transition-colors">
                        Blog
                    </Link>
                    <Link href="/terms" className="text-base hover:text-gray-300 transition-colors">
                        Terms
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
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-md px-3 py-2 text-sm hover:bg-gray-900"
                            >
                                X (Twitter)
                            </a>
                            <a
                                href="https://t.me"
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
                <div className="md:hidden bg-black border-t border-gray-800">
                    <div className="px-6 py-4 space-y-4">
                        <a
                            href="#story"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Story
                        </a>
                        <a
                            href="#blog"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Blog
                        </a>
                        <Link
                            href="/terms"
                            className="block text-base hover:text-gray-300 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Terms
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