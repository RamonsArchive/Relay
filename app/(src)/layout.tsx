import Footer from "@/components/Footer";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className="root-container">{children}</div>
      <Footer />
    </main>
  );
};

export default layout;
