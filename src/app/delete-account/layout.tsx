import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Zuva Network Account & Data",
  description:
    "Request permanent deletion of your Zuva Network account, mining progress, rewards, and associated personal data.",
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
