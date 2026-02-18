import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions | Zuva Network",
    description:
        "Read the Terms and Conditions for using Zuva Network, the light mobile mining app for earning digital token rewards.",
};

export default function TermsAndConditionsPage() {
    const appName = "Zuva Network";
    const companyName = "Zuva Network";
    const email = "support@zuva.network";
    const effectiveDate = "February 18, 2026";

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-8 py-16 md:px-16">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Terms and Conditions
                    </h1>

                    <div className="mb-12 flex flex-col items-center gap-3 text-sm text-zinc-400 sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5">
                            <span className="font-medium">Effective Date:</span>
                            <span className="text-zinc-200">{effectiveDate}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5">
                            <span className="font-medium">Last Updated:</span>
                            <span className="text-zinc-200">{effectiveDate}</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="prose prose-lg prose-invert mx-auto max-w-none">
                    <p className="lead text-zinc-300">
                        These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the {appName} mobile
                        application (the &quot;App&quot;) operated by {companyName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
                        The App enables users to participate in light, non-intensive mobile-based contribution activities
                        (referred to as &quot;mining&quot;) to potentially earn rewards in our digital token ecosystem,
                        inspired by early Bitcoin-style decentralized participation and Pi Network-style consensus mechanisms
                        (daily active check-ins, security circles, referrals, minimal battery/CPU usage).
                    </p>

                    <p className="text-zinc-400">
                        <strong>IMPORTANT:</strong> The tokens/rewards have no current monetary value, are not cryptocurrency yet,
                        may never have value, are not transferable until (if ever) a future mainnet/launch, and are provided
                        &quot;AS IS&quot; with no guarantees. Participation involves risk. Read carefully.
                    </p>

                    <p className="text-zinc-400">
                        By downloading, installing, accessing, or using the App, you agree to be bound by these Terms.
                        If you do not agree, do not use the App.
                    </p>

                    <div className="mt-12 space-y-12">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">1. Eligibility</h2>
                            <p className="mb-4 text-zinc-400">
                                You must be at least 13 years old (or 16 in some jurisdictions) to use the App. If you are under the age of majority in your country, you must have parental/guardian consent.
                            </p>
                            <p className="mb-4 text-zinc-400">
                                You may not use the App if you are barred under applicable laws (e.g., sanctioned countries, OFAC lists, or Nigerian SEC/CBN restrictions on certain crypto activities).
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">2. Account Registration and Security</h2>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>You must register using a valid email address.</li>
                                <li>You are responsible for maintaining the confidentiality of your account and any security circle/referral codes.</li>
                                <li>We use email verification to reduce multi-accounting and Sybil attacks.</li>
                                <li>Impersonation, fake identities, or abuse of referrals may result in permanent suspension and forfeiture of all accrued rewards.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">3. Mining and Rewards</h2>
                            <p className="mb-4 text-zinc-400">
                                The App allows &quot;light mining&quot; through daily check-ins,
                                referring new users, and other non-computational contributions. No actual hashing or high resource usage occurs.
                            </p>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Rewards accrue in-app as points/tokens based on activity and network rules (subject to change).</li>
                                <li>Rewards have no current value, are not money, securities, or property until (if ever) tokenized on a blockchain/mainnet.</li>
                                <li>We may adjust mining rates, halt mining, reset balances, or impose lock-ups/vesting at any time.</li>
                                <li>No guaranteed redemption, payout, or conversion to fiat/crypto exists now or in the future.</li>
                                <li>Future mainnet launch, token distribution, or transferability is speculative and not promised.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">4. Prohibited Conduct</h2>
                            <p className="mb-4 text-zinc-400">You agree NOT to:</p>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Create multiple accounts or use automation/bots/farms to inflate rewards</li>
                                <li>Engage in fraud, scams, spam, or misleading referrals</li>
                                <li>Attempt to reverse-engineer, hack, or interfere with the App/consensus</li>
                                <li>Use the App for illegal purposes or in violation of sanctions/AML laws</li>
                                <li>Sell, trade, or offer to sell in-app rewards/points before any official transferability</li>
                            </ul>
                            <p className="mt-4 text-zinc-400">
                                Violation may result in immediate account termination, reward forfeiture, and reporting to authorities.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">5. Intellectual Property</h2>
                            <p className="text-zinc-400">
                                All rights, title, and interest in the App, code, design, trademarks, and any future tokens belong to us or our licensors. You receive a limited, revocable license to use the App for personal, non-commercial purposes only.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">6. Disclaimers and No Warranty</h2>
                            <p className="mb-4 text-zinc-400">
                                THE APP AND ANY REWARDS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                            </p>
                            <p className="mb-2 font-semibold text-white">We do not guarantee:</p>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Continuous, uninterrupted, or error-free operation</li>
                                <li>Any specific reward amount or value</li>
                                <li>Future token launch, listing, or liquidity</li>
                                <li>Protection against all security risks</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">7. Limitation of Liability</h2>
                            <p className="mb-4 text-zinc-400">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP, EVEN IF ADVISED OF THE POSSIBILITY.
                            </p>
                            <p className="text-zinc-400">
                                Our total liability shall not exceed the amount you paid us (typically zero, as the App is free).
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">8. Indemnification</h2>
                            <p className="text-zinc-400">
                                You agree to indemnify and hold us harmless from any claims, losses, liabilities, damages, costs arising from your violation of these Terms or misuse of the App.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">9. Termination</h2>
                            <p className="text-zinc-400">
                                We may suspend or terminate your account at any time, with or without cause or notice, including for suspected abuse. Upon termination, you lose access and all accrued rewards may be forfeited.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">10. Changes to Terms</h2>
                            <p className="text-zinc-400">
                                We may update these Terms at any time. Continued use after changes constitutes acceptance. We will notify via in-app notice or posting the updated date.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">11. Governing Law and Dispute Resolution</h2>
                            <p className="mb-4 text-zinc-400">
                                These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict of law principles.
                            </p>
                            <p className="text-zinc-400">
                                Any disputes shall be resolved exclusively in the courts of Lagos, Nigeria. You agree to arbitration in Lagos under the Arbitration and Mediation Act if we elect.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">12. Miscellaneous</h2>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>These Terms, together with our Privacy Policy, constitute the entire agreement.</li>
                                <li>If any provision is invalid, the remainder remains in effect.</li>
                                <li>No waiver of any breach shall constitute a waiver of any subsequent breach.</li>
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                            <h2 className="mb-4 text-2xl font-bold text-white">13. Contact Us</h2>
                            <p className="mb-6 text-zinc-400">
                                Questions about these Terms? Contact us at:
                            </p>
                            <div className="text-lg font-semibold text-white">{companyName}</div>
                            <a href={`mailto:${email}`} className="mt-2 block text-yellow-500 hover:text-yellow-400 hover:underline">
                                {email}
                            </a>
                        </section>
                    </div>

                    <p className="mt-16 text-center text-sm text-zinc-500">
                        By using {appName}, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                    </p>
                </div>

                <div className="mt-10 text-center text-sm text-zinc-500">
                    <Link href="/privacy-policy" className="mx-4 hover:text-yellow-500 hover:underline text-zinc-400">
                        Privacy Policy
                    </Link>
                    <Link href="/" className="hover:text-yellow-500 hover:underline text-zinc-400">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}