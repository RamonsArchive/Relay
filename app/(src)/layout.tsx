import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import SidebarWrapper from "@/components/SidebarWrapper";
import { SideBarCardSkeleton } from "@/components/SideBarSkeleton";
import { Providers } from "@/app/context/providers";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">

      <Suspense fallback={<div>Loading content</div>}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          <div className="root-container">
            <Suspense fallback={<SideBarCardSkeleton />}>
              <SidebarWrapper />
            </Suspense>

            <div className="content-wrapper">
              <Suspense fallback={<div>Loading pages...</div>}>
                <div className="content-container">{children}</div>
              </Suspense>
            </div>
          </div>
          <div className="footer-wrapper">
            <Suspense fallback={<div>Loading...</div>}>
              <Footer />
            </Suspense>
          </div>
          </Providers>
      </Suspense>
    </main>
  );
};

export default layout;
