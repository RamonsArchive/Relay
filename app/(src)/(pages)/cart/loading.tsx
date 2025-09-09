import Loader from "@/components/Loader";

const loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-70 z-[999]">
      <Loader />
    </div>
  );
};

export default loading;
