import React from 'react';

const Divider = () => {
  return (
    <div className="relative my-8 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
      <span className="mx-4 bg-white px-4 text-sm text-gray-500">Or</span>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
