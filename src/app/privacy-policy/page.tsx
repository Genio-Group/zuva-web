import Link from "next/link";



export default function PrivacyPolicyPage() {
    const appName = "Zuva Network";
    const companyName = "Zuva Network";
    const email = "support@zuva.network";
    const effectiveDate = "January 23, 2026";

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-8 py-16 md:px-16">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Privacy Policy
                    </h1>

                    <div className="mb-12 flex flex-col items-center gap-3 text-sm text-zinc-400 sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5">
                            <span className="font-medium">Effective Date:</span>
                            <span className="text-zinc-200">{effectiveDate}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5">
                            <span className="font-medium">Last Updated:</span>
                            <span className="text-zinc-200">23rd January, 2026</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="prose prose-lg prose-invert mx-auto max-w-none">
                    <p className="lead text-xl text-zinc-300">
                        <span className="font-semibold text-yellow-500">{companyName}</span> operates the {appName} mobile application (the &quot;App&quot;), which allows users to participate in light,
                        non-intensive mobile-based mining to earn rewards in our digital token system,
                        inspired by early Bitcoin mining principles.
                    </p>

                    <p className="text-zinc-400">
                        We are committed to protecting your privacy. This Privacy Policy explains how we
                        collect, use, disclose, and safeguard your information when you use the App. By
                        downloading, installing, accessing, or using the App, you agree to the collection
                        and use of information in accordance with this policy. If you do not agree, please
                        do not use the App.
                    </p>

                    <div className="mt-12 space-y-12">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">1. Information We Collect</h2>
                            <p className="mb-4 text-zinc-400">
                                We collect minimal information necessary to operate a light mining and rewards system.
                            </p>

                            <div className="mb-6">
                                <h3 className="mb-2 text-lg font-semibold text-yellow-500">Information You Provide Directly:</h3>
                                <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                    <li>Phone number (for account creation, verification, and security)</li>
                                    <li>Email address (optional, for recovery, notifications, or alternative login)</li>
                                    <li>Username or display name</li>
                                    <li>Referral codes / invited users&apos; phone numbers</li>
                                    <li>Wallet address (if/when you claim or transfer rewards/tokens)</li>
                                    <li>KYC/identity verification data (only if required for mainnet launch or compliance)</li>
                                    <li>Messages or feedback you send us</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-2 text-lg font-semibold text-yellow-500">Automatically Collected Information:</h3>
                                <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                    <li>Device information: device model, OS version, unique device identifiers</li>
                                    <li>IP address and approximate location (country/city level)</li>
                                    <li>App usage data: mining session timestamps, check-in frequency</li>
                                    <li>Analytics: crash logs, performance metrics</li>
                                </ul>
                            </div>

                            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                                <p className="mb-2 font-semibold text-white">We do NOT collect:</p>
                                <ul className="list-inside list-disc space-y-1 text-zinc-400 marker:text-red-500">
                                    <li>Precise geolocation</li>
                                    <li>Contacts list (beyond invited referral phone numbers you explicitly provide)</li>
                                    <li>Financial information (e.g., bank details, credit cards)</li>
                                    <li>Private keys or sensitive wallet seeds</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">2. How We Use Your Information</h2>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Create and maintain your account</li>
                                <li>Enable light mining (daily active participation, security circle validation)</li>
                                <li>Calculate and distribute rewards/tokens based on activity</li>
                                <li>Prevent fraud, abuse, multi-accounting, and Sybil attacks</li>
                                <li>Send notifications about mining status, rewards, or app updates</li>
                                <li>Comply with legal obligations (AML/KYC if applicable)</li>
                                <li>Improve the App and facilitate referrals</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">3. Sharing of Information</h2>
                            <p className="mb-4 text-zinc-400">We do not sell your personal information. We may share information:</p>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>With service providers (cloud hosting, analytics, KYC) under strict confidentiality</li>
                                <li>For legal reasons: to comply with laws or protect rights</li>
                                <li>In case of merger, acquisition, or sale of assets</li>
                                <li>With your consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">4. Data Storage and Security</h2>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>We store data on secure cloud servers.</li>
                                <li>We use industry-standard encryption and access controls.</li>
                                <li>Phone numbers and unique identifiers are stored to enable the consensus graph.</li>
                                <li>We retain data as long as your account is active plus a compliance period.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">5. Your Rights and Choices</h2>
                            <p className="mb-4 text-zinc-400">
                                Depending on your location, you may have rights under applicable data protection laws
                                (e.g., Access, Correction, Deletion, Withdrawal of Consent).
                            </p>
                            <p className="mb-4 text-zinc-400">
                                To exercise rights, contact us at{" "}
                                <a href={`mailto:${email}`} className="text-yellow-500 hover:text-yellow-400 hover:underline">
                                    {email}
                                </a>.
                            </p>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Opt out of non-essential notifications</li>
                                <li>Delete your account via app settings</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">6. Children&apos;s Privacy</h2>
                            <p className="text-zinc-400">
                                The App is not directed to children under 13. We do not knowingly collect data from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">7. International Transfers</h2>
                            <p className="text-zinc-400">
                                Your data may be transferred to and processed in countries outside your residence, with appropriate safeguards.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">8. Changes to This Policy</h2>
                            <p className="text-zinc-400">
                                We may update this policy. Continued use constitutes acceptance.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                            <h2 className="mb-4 text-2xl font-bold text-white">9. Contact Us</h2>
                            <p className="mb-6 text-zinc-400">
                                For questions or concerns about our privacy practices:
                            </p>
                            <div className="text-lg font-semibold text-white">{companyName}</div>
                            <a href={`mailto:${email}`} className="mt-2 block text-yellow-500 hover:text-yellow-400 hover:underline">
                                {email}
                            </a>
                        </section>
                    </div>

                    <p className="mt-16 text-center text-sm text-zinc-500">
                        By using {appName}, you acknowledge this Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}