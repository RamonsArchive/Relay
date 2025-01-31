const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className="root-container">{children}</div>
    </main>
  );
};

export default layout;
