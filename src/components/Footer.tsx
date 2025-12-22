import Link from "next/link";
import { Twitter, Github, Linkedin, Disc } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-black py-16 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            Zuva Network
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The next generation of decentralized mining. effective, user-friendly, and built for everyone.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                <Twitter size={18} className="text-white" />
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                <Github size={18} className="text-white" />
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                <Disc size={18} className="text-white" />
                            </Link>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Product</h3>
                        <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Mobile App</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Staking</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Resources</h3>
                        <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Whitepaper</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Brand Assets</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Company</h3>
                        <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Zuva Network. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
