import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";
import { NextUiProvider } from "@/lib/providers/NextUIProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "JetXClub",
  description:
    "Endless fun without the headaches. With a fleet of jetskis' at your fingertips, the only question you'll have is where are we going this weekend?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NextUiProvider>
        <ReduxProvider>
          <>
            <div className="min-h-screen grid grid-rows-[auto_1fr_auto] max-w-[100vw] overflow-hidden">
              <div>{children}</div>
            </div>
            <ScrollToTopButton />
            <Toaster />
          </>
        </ReduxProvider>
      </NextUiProvider>
    </div>
  );
}
