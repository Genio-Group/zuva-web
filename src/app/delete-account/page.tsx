// app/delete-account/page.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const DELETE_EMAIL = "zuvanetwork@gmail.com";

export default function DeleteAccountPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string) || "";
    const username = (formData.get("username") as string) || "";
    const details = (formData.get("details") as string) || "";

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          details,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send deletion request");
      }

      toast.success("Deletion request sent successfully! You'll receive a confirmation email once your account is deleted.");
      form.reset();
    } catch (error: any) {
      console.error("Error submitting deletion request:", error);
      toast.error(error.message || "Failed to send deletion request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl text-yellow-500 md:text-5xl font-bold tracking-tight mb-4">
            Delete Your Zuva Network Account
          </h1>
          <p className="text-xl text-neutral-300">
            Permanent removal of your account, mining data, rewards, and personal information
          </p>
        </header>

        {/* Main Content */}
        <section className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed mb-8">
            Welcome to the official account deletion page for{" "}
            <strong className="text-yellow-500">Zuva Network</strong> — the mobile app for social mining, building mining circles, earning rewards, and participating in decentralized opportunities.
          </p>

          <p className="mb-8">
            If you wish to permanently delete your account and all associated personal data, please use the form below. This is the web-based method required for Google Play compliance (in addition to any in-app deletion option).
          </p>

          {/* Important Info Box */}
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 mb-10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-red-500">Deletion Process & Data Details</h2>

            <h3 className="text-xl font-medium mb-4">How to Request Deletion</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-3">
              <li>Fill out the form below with the email/username used in the Zuva Network app.</li>
              <li>Submit the request — it will be sent directly to {DELETE_EMAIL}.</li>
              <li>You'll receive a confirmation email once deletion is complete (usually within 30 days).</li>
              <li>Deletion is permanent and irreversible.</li>
            </ol>

            <h3 className="text-xl font-medium mb-4">What We Delete</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Your account profile (email, username/player ID, phone number if provided)</li>
              <li>Mining progress, reward balances, referral links/data</li>
              <li>Any associated user content, chats, or profile information</li>
              <li>Other personal data linked to your account</li>
            </ul>

            <h3 className="text-xl font-medium mb-4">What May Be Retained (and Why)</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Anonymized usage statistics (no personal identifiers) — kept indefinitely to improve the app</li>
              <li>Limited transaction/fraud prevention logs — retained for up to 12 months (or longer if required by law or anti-fraud regulations in the crypto space)</li>
              <li>Any data we are legally obligated to keep (e.g., for tax, regulatory, or compliance purposes)</li>
            </ul>

            <p className="text-sm text-neutral-400 italic">
              We take your privacy seriously and process deletions in line with applicable data protection laws.
            </p>
          </div>

          {/* Form Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Deletion Request</h2>

            <form
              onSubmit={handleSubmit}
              className="bg-neutral-800/50 rounded-xl border border-neutral-700 shadow-2xl p-8 md:p-10 space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Email used in Zuva Network app <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-2">
                  Username / Player ID <span className="text-neutral-500">(optional)</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your username or player ID"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-neutral-300 mb-2">
                  Additional details <span className="text-neutral-500">(optional)</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Any other information that might help us identify your account..."
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="confirm"
                  name="confirm"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-900 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="confirm" className="text-sm text-neutral-300">
                  I understand that account deletion is permanent and irreversible. I confirm that I want to delete my Zuva Network account and associated data.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto md:px-12 bg-red-500 hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                  {isSubmitting ? "Sending..." : `Send deletion request to ${DELETE_EMAIL}`}
                </button>
              </div>
            </form>

            <p className="text-center mt-6 text-neutral-400 text-sm">
              Your request will be automatically sent to{" "}
              <a
                href={`mailto:${DELETE_EMAIL}?subject=Zuva%20Network%20Account%20Deletion%20Request`}
                className="text-blue-400 hover:underline font-medium"
              >
                {DELETE_EMAIL}
              </a>
              . No need to open your email client.
            </p>
          </div>

          {/* Fallback Email */}
          <div className="text-center">
            <p className="text-lg mb-4">
              Prefer to write your own email? Send your request to:
            </p>
            <a
              href={`mailto:${DELETE_EMAIL}?subject=Zuva%20Network%20Account%20Deletion%20Request`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              {DELETE_EMAIL}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} Zuva Network. All rights reserved.</p>
          <p className="mt-2">
            This page complies with Google Play's data deletion requirements for apps with user accounts.
          </p>
        </footer>
      </div>
    </div>
  );
}