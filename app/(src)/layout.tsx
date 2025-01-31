import Footer from "@/components/Footer";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SignIn, SignedOut } from "@clerk/nextjs";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className="root-container">{children}</div>
      <Footer />
    </main>
  );
};

export default layout;
