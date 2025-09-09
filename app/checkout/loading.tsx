import Loader from '@/components/Loader';
import React from 'react'

const loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-70 z-[999]">
      <Loader />
    </div>
  );
}

export default loading;